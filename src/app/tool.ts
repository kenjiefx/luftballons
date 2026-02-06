import { PatchAPI, PluncAppAPI } from "./types";

// @ts-ignore
const app = plunc.create("DynamicTool");

type ToolData = {
  id: string;
  type: "bulk-update" | "report";
  name: string;
  description: string;
  domain: string;
  fields: string[];
};

type MainPageComponentScope = {
  toolName: string;
  toolDescription: string;
  toolContext: ToolData;
  downloadTemplateCSV: () => void;
  token: string;
  ticketId: string;
  executeAction: () => Promise<void>;
  getButtonStyle: () => string;
  requests: BuiltRequest[];
  status: "idle" | "in-progress" | "completed" | "error";
};
app.component(
  "MainPageComponent",
  (
    $scope: MainPageComponentScope,
    IDBService: IndexDbService,
    $app: PluncAppAPI,
    $patch: PatchAPI,
    RequestBuilderService: RequestBuilderService,
  ) => {
    // For some reason, plunc nukes event listeners on file inputs when
    // patching the DOM, so we need to reattach the listener after patching.
    const hackyPatch = async () => {
      await $patch();
      attachListenerToFileInput();
    };
    $app.ready(async () => {
      // get  toolId from query params
      const urlParams = new URLSearchParams(window.location.search);
      const toolId = urlParams.get("toolId");
      if (toolId) {
        // try to load tool data from IDB
        const toolData = await IDBService.retrieveFromIDB<{
          [key: string]: ToolData;
        }>({
          dbName: "luftballoons-tools",
          key: "all-tools",
        });
        if (toolData && toolData[toolId]) {
          const { name, description } = toolData[toolId];
          $scope.toolName = name;
          $scope.toolDescription = description;
          $scope.toolContext = toolData[toolId];
          await hackyPatch();
        } else {
          console.warn(`No tool data found in IDB for toolId: ${toolId}`);
        }
      }
    });

    const attachListenerToFileInput = () => {
      const fileInput = document.getElementById(
        "file-input",
      ) as HTMLInputElement | null;

      if (!fileInput) {
        console.warn("file-input not found in DOM");
        return;
      }

      fileInput.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;

        if (!target.files || target.files.length === 0) {
          console.warn("No file selected");
          return;
        }

        const file = target.files[0];

        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target?.result;
          // @ts-expect-error
          Papa.parse(content as string, {
            header: true,
            complete: (results) => {
              $scope.requests = RequestBuilderService.buildRequests(
                endpoints,
                results.data[0] as SourceObject,
              );
            },
          });
        };

        reader.onerror = () => {
          console.error("Error reading file");
        };

        reader.readAsText(file);
      });
    };

    $scope.downloadTemplateCSV = () => {
      // create headers based on the selected fields
      const headers = [];
      if ($scope.toolContext.domain === "listings") {
        headers.push("listingId");
      }
      headers.push(...$scope.toolContext.fields);
      const csvHeaders = headers.join(",") + "\n";
      const csvContent = `data:text/csv;charset=utf-8,${csvHeaders}`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${$scope.toolName}-template.csv`);
      document.body.appendChild(link); // Required for FF
      link.click();
      document.body.removeChild(link);
    };

    $scope.executeAction = async () => {
      $scope.status = "in-progress";
      await $patch("ExecuteButtonBlock");
      for (const request of $scope.requests) {
        try {
          const response = await fetch(request.path, {
            method: request.method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${$scope.token}`,
            },
            body: request.payload ? JSON.stringify(request.payload) : undefined,
          });
          if (!response.ok) {
            console.error(
              `Request to ${request.path} failed with status ${response.status}`,
            );
          } else {
            const data = await response.json();
            console.log(`Response from ${request.path}:`, data);
          }
        } catch (error) {
          console.error(`Error executing request to ${request.path}:`, error);
        }
      }
      $scope.status = "completed";
      await $patch("ExecuteButtonBlock");
    };

    $scope.getButtonStyle = () => {
      if ($scope.status === "in-progress") {
        return "is-loading";
      }
      return "";
    };
  },
);

type RequestBuilderService = {
  buildRequests: (
    endpoints: EndpointSchema[],
    source: SourceObject,
  ) => BuiltRequest[];
};
app.service("RequestBuilderService", () => {
  const extractPlaceholder = (value: string): string | null => {
    const match = value.match(/{{(.*?)}}/);
    return match ? match[1] : null;
  };

  const replacePathPlaceholders = (
    path: string,
    source: SourceObject,
  ): string => {
    return path.replace(/{{(.*?)}}/g, (_, key) => {
      const value = source[key];
      return value !== undefined && value !== null ? String(value) : "";
    });
  };

  const resolveValue = (schemaValue: any, source: SourceObject): any => {
    // Placeholder string
    if (typeof schemaValue === "string") {
      const key = extractPlaceholder(schemaValue);
      if (!key) return undefined;

      const value = source[key];
      return value !== undefined ? value : undefined;
    }

    // Array schema
    if (Array.isArray(schemaValue)) {
      if (schemaValue.length === 1) {
        const key = extractPlaceholder(schemaValue[0]);
        if (!key) return undefined;

        const value = source[key];
        return Array.isArray(value) ? value : undefined;
      }

      const arr = schemaValue
        .map((item) => resolveValue(item, source))
        .filter((v) => v !== undefined);

      return arr.length ? arr : undefined;
    }

    // Object schema
    if (typeof schemaValue === "object" && schemaValue !== null) {
      const result: Record<string, any> = {};

      for (const key of Object.keys(schemaValue)) {
        const resolved = resolveValue(schemaValue[key], source);

        if (resolved !== undefined) {
          result[key] = resolved;
        }
      }

      return Object.keys(result).length ? result : undefined;
    }

    return undefined;
  };

  const buildPayload = (
    fieldsSchema: Record<string, any>,
    source: SourceObject,
  ): Record<string, any> | undefined => {
    const payload: Record<string, any> = {};

    for (const key of Object.keys(fieldsSchema)) {
      const resolved = resolveValue(fieldsSchema[key], source);

      if (resolved !== undefined) {
        payload[key] = resolved;
      }
    }

    return Object.keys(payload).length ? payload : undefined;
  };

  const buildRequests = (
    endpoints: EndpointSchema[],
    source: SourceObject,
  ): BuiltRequest[] => {
    return endpoints.map((endpoint) => {
      const path = replacePathPlaceholders(endpoint.path, source);

      const payload = buildPayload(endpoint.fields, source);

      return payload
        ? {
            method: endpoint.method,
            path,
            payload,
          }
        : {
            method: endpoint.method,
            path,
          };
    });
  };
  return {
    buildRequests,
  };
});

type IndexDbService = {
  storeToIDB: (params: {
    dbName: string;
    key: string;
    data: any;
  }) => Promise<boolean>;
  retrieveFromIDB: <T>(params: {
    dbName: string;
    key: string;
  }) => Promise<T | null>;
  removeFromIDB: (params: { dbName: string; key: string }) => Promise<boolean>;
};
app.service("IDBService", () => {
  //const dbCache = new Map<string, Promise<IDBDatabase>>();
  const mainstore = "master";

  const connectToIDB = ({
    dbName,
  }: {
    dbName: string;
  }): Promise<IDBDatabase> => {
    // if (dbCache.has(dbName)) {
    //   return dbCache.get(dbName)!;
    // }

    const dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onerror = (event) => {
        console.error({
          message: "failed to open IndexedDB database instance",
          error: request.error,
          event,
        });
        // dbCache.delete(dbName);
        reject(request.error ?? new Error("Failed to open IndexedDB"));
      };

      request.onsuccess = (event) => {
        if (!event.target || !("result" in event.target)) {
          //dbCache.delete(dbName);
          return reject(new Error("Missing result in onsuccess event.target"));
        }

        const db = event.target.result as IDBDatabase;

        db.addEventListener("close", () => {
          console.warn(
            `IDB database "${dbName}" was closed, removing from cache`,
          );
          // dbCache.delete(dbName);
        });

        db.addEventListener("versionchange", () => {
          console.warn(
            `IDB database "${dbName}" needs upgrade, closing & clearing cache`,
          );
          db.close();
          // dbCache.delete(dbName);
        });

        //dbCache.set(dbName, Promise.resolve(db));
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        if (!event.target || !("result" in event.target)) {
          // dbCache.delete(dbName);
          return reject(
            new Error("Missing result in onupgradeneeded event.target"),
          );
        }

        const db = event.target.result as IDBDatabase;
        if (!db.objectStoreNames.contains(mainstore)) {
          db.createObjectStore(mainstore, { keyPath: "key" });
        }
      };
    });

    // dbCache.set(dbName, dbPromise);
    return dbPromise;
  };

  const storeToIDB = async ({
    dbName,
    key,
    data,
  }: {
    dbName: string;
    key: string;
    data: any;
  }) => {
    const databaseInstance = await connectToIDB({ dbName });
    return new Promise((resolve, reject) => {
      const transaction = databaseInstance.transaction(mainstore, "readwrite");
      const objectStore = transaction.objectStore(mainstore);
      const storeRequest = objectStore.put({
        key: key,
        value: data,
      });
      storeRequest.onsuccess = () => resolve(true);
      storeRequest.onerror = (event) => {
        console.error({
          message: "failed to store data to indexed db",
          key: key,
          data: data,
          event: event,
        });
        resolve(false);
      };
    });
  };

  async function retrieveFromIDB<T>({
    dbName,
    key,
  }: {
    dbName: string;
    key: string;
  }): Promise<T | null> {
    const databaseInstance = await connectToIDB({ dbName });

    return new Promise<T | null>((resolve, reject) => {
      const transaction = databaseInstance.transaction(mainstore, "readonly");
      const objectStore = transaction.objectStore(mainstore);
      const getRequest = objectStore.get(key);

      getRequest.onsuccess = () => {
        // result is either undefined (not found) or { key, value }
        const result = getRequest.result as
          | { key: string; value: T }
          | undefined;

        console.log({ key, result });
        resolve(result ? result.value : null);
      };

      getRequest.onerror = (event) => {
        console.error({
          message: "failed to retrieve data from indexed db",
          key,
          event,
        });
        reject(new Error("Failed to retrieve data from IndexedDB"));
      };
    });
  }

  const removeFromIDB = async ({
    dbName,
    key,
  }: {
    dbName: string;
    key: string;
  }) => {
    const databaseInstance = await connectToIDB({ dbName });
    return new Promise((resolve, reject) => {
      const transaction = databaseInstance.transaction(mainstore, "readwrite");
      const objectStore = transaction.objectStore(mainstore);
      const deleteRequest = objectStore.delete(key);
      deleteRequest.onsuccess = () => resolve(true);
      deleteRequest.onerror = (event) => {
        console.error({
          message: "failed to delete data from indexed db",
          key: key,
          event: event,
        });
        resolve(false);
      };
    });
  };

  return {
    storeToIDB,
    retrieveFromIDB,
    removeFromIDB,
  };
});

const endpoints = [
  {
    domain: "listings",
    scope: "basic:data",
    method: "PUT",
    path: "https://admin.guesty.com/openapi/open-api-mailer/listings/{{listingId}}",
    fields: {
      hostName: "{{hostName}}",
      wifiName: "{{wifiName}}",
      wifiPassword: "{{wifiPassword}}",
      parkingInstructions: "{{parkingInstructions}}",
      trashCollectedOn: "{{trashCollectedOn}}",
      houseManual: "{{houseManual}}",
      checkOutInstructions: "{{checkOutInstructions}}",
      checkInInstructions: {
        notes: "{{additionalEntryInstructionsNotes}}",
      },
      cleaning: {
        instructions: "{{cleaningInstructions}}",
      },
      calendarRules: {
        defaultAvailability: "{{defaultAvailability}}",
        bookingWindow: {
          defaultSettings: {
            days: "{{bookingWindowDays}}",
          },
          updatedAt: "{{bookingWindowUpdatedAt}}",
          updatedBy: "{{bookingWindowUpdatedBy}}",
        },
      },
      doorCode: "{{doorCode}}",
      lockCode: "{{lockCode}}",
      propertyType: "{{propertyType}}",
      roomType: "{{roomType}}",
      accommodates: "{{listingOccupancy}}",
      license: {
        licenseNumber: "{{licenseNumber}}",
      },
      bedrooms: "{{listingsBedrooms}}",
      bathrooms: "{{listingsBathrooms}}",
      beds: "{{listingBeds}}",
      defaultCheckInTime: "{{checkInTime}}",
      defaultCheckOutTime: "{{checkOutTime}}",
      prices: {
        monthlyPriceFactor: "{{monthlyDiscount}}",
        weeklyPriceFactor: "{{weeklyDiscount}}",
        extraPersonFee: "{{extraPersonFee}}",
        cleaningFee: "{{cleaningFee}}",
      },
      luggageStorage: "{{luggageStorage}}",
      address: {
        lat: "{{addressLat}}",
        lng: "{{addressLng}}",
      },
    },
  },
];

type SourceObject = Record<string, any>;

type EndpointSchema = {
  domain: string;
  scope: string;
  method: string;
  path: string;
  fields: any;
};

type BuiltRequest = {
  method: string;
  path: string;
  payload?: Record<string, any>;
};
