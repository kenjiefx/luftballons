import { PatchAPI, PluncAppInstance } from "./types";

// @ts-ignore
const app: PluncAppInstance = plunc.create("Luftballoons");

type MainComponentScope = {
  state: "home" | "create-bulk-update-tool";
  handleUpdateBuilderClick: () => void;
};
app.component(
  "Main",
  (
    $scope: MainComponentScope,
    $patch: PatchAPI,
    HomePage: HomePageComponent,
    CreateBulkUpdateToolPage: CreateBulkUpdateToolPageComponent,
  ) => {
    $scope.state = "home";
    $scope.handleUpdateBuilderClick = () => {
      $scope.state = "create-bulk-update-tool";
      $patch();
    };
    HomePage.onUpdateBuilderClick($scope.handleUpdateBuilderClick);
    CreateBulkUpdateToolPage.onCreateToolSuccess(() => {
      $scope.state = "home";
      $patch();
      HomePage.emitToolCreatedEvent();
    });
  },
);

type HomePageComponent = {
  onUpdateBuilderClick: (listener: () => void) => void;
  emitToolCreatedEvent: () => void;
};
type HomePageComponentScope = {
  title: string;
  handleUpdateBuilderClick: () => void;
  handleOpenToolClick: (toolId: string) => void;
  tools: ToolList;
};
type ToolList = Array<ToolData>;

app.component(
  "HomePage",
  (
    $scope: HomePageComponentScope,
    IDBService: IndexDbService,
    $patch: PatchAPI,
  ) => {
    $scope.title = "Welcome to Luftballoons!";
    const eventListeners: { [key: string]: () => void } = {
      "update-builder-click": () => {},
    };
    $scope.tools = [];
    $scope.handleUpdateBuilderClick = () => {
      eventListeners["update-builder-click"]();
    };
    $scope.handleOpenToolClick = async (toolId) => {
      const allStoredTools: { [key: string]: ToolData } | null =
        await IDBService.retrieveFromIDB<{
          [key: string]: ToolData;
        }>({
          dbName: "luftballoons-tools",
          key: "all-tools",
        });
      if (allStoredTools && allStoredTools[toolId]) {
        chrome.windows.create(
          {
            url: chrome.runtime.getURL("src/tool.html?toolId=" + toolId),
            type: "popup",
            width: 400,
            height: 600,
          },
          (win) => {
            if (!win || !win.id) {
              console.error("Failed to create popup window");
              return;
            }
          },
        );
      }
    };
    const updateToolListSection = async () => {
      const allStoredTools: { [key: string]: ToolData } | null =
        await IDBService.retrieveFromIDB<{
          [key: string]: ToolData;
        }>({
          dbName: "luftballoons-tools",
          key: "all-tools",
        });
      console.log("Retrieved tools from IDB:", allStoredTools);
      if (allStoredTools !== null) {
        $scope.tools = Object.values(allStoredTools);
        $patch();
      }
    };
    setTimeout(updateToolListSection, 100);
    return {
      onUpdateBuilderClick: (listener: () => {}) => {
        eventListeners["update-builder-click"] = listener;
      },
      emitToolCreatedEvent: () => {
        updateToolListSection();
      },
    };
  },
);

type CreateBulkUpdateToolPageComponentScope = {
  step: number;
  domain: "listings" | "reservations" | "owners";
  handleDomainSelect: (
    domain: CreateBulkUpdateToolPageComponentScope["domain"],
  ) => void;
  styleActiveStep: (stepNumber: number) => string;
  styleActiveStepTitle: (stepNumber: number) => string;
  selectedListingsFields: {
    nickname: boolean;
    hostname: boolean;
    houseManual: boolean;
    wifiName: boolean;
    wifiPassword: boolean;
    defaultCheckinTime: boolean;
    defaultCheckoutTime: boolean;
    parkingInstructions: boolean;
    doorCode: boolean;
    lockCode: boolean;
  };
  goToCreateToolStep: () => void;
  listingFields: Array<
    keyof CreateBulkUpdateToolPageComponentScope["selectedListingsFields"]
  >;
  toggleSelectField: (
    field: keyof CreateBulkUpdateToolPageComponentScope["selectedListingsFields"],
  ) => void;
  isListingFieldSelected: (
    field: keyof CreateBulkUpdateToolPageComponentScope["selectedListingsFields"],
  ) => boolean;
  getSelectedListingsFields: () => Array<
    keyof CreateBulkUpdateToolPageComponentScope["selectedListingsFields"]
  >;
  toolName: string;
  toolDescription: string;
  handleCreateTool: () => void;
};
type CreateBulkUpdateToolPageComponent = {
  onCreateToolSuccess: (listener: () => void) => void;
};
app.component<CreateBulkUpdateToolPageComponent>(
  "CreateBulkUpdateToolPage",
  (
    $scope: CreateBulkUpdateToolPageComponentScope,
    $patch: PatchAPI,
    ToolService: ToolService,
  ) => {
    $scope.toolName = "";
    $scope.toolDescription = "";
    $scope.step = 1;
    $scope.domain = "listings";
    $scope.handleDomainSelect = (domain) => {
      $scope.domain = domain;
      $scope.step = 2;
      $patch();
    };
    $scope.goToCreateToolStep = () => {
      $scope.step = 3;
      $patch();
    };
    $scope.styleActiveStep = (stepNumber) => {
      if ($scope.step >= stepNumber) {
        return "active-step";
      }
      return "inactive-step";
    };
    $scope.styleActiveStepTitle = (stepNumber) => {
      if ($scope.step >= stepNumber) {
        return "active-step-title";
      }
      return "inactive-step-title";
    };
    $scope.selectedListingsFields = {
      nickname: false,
      hostname: false,
      houseManual: false,
      wifiName: false,
      wifiPassword: false,
      defaultCheckinTime: false,
      defaultCheckoutTime: false,
      parkingInstructions: false,
      doorCode: false,
      lockCode: false,
    };
    $scope.listingFields = Object.keys($scope.selectedListingsFields) as Array<
      keyof CreateBulkUpdateToolPageComponentScope["selectedListingsFields"]
    >;
    $scope.toggleSelectField = (field) => {
      $scope.selectedListingsFields[field] =
        !$scope.selectedListingsFields[field];
      $patch();
    };
    $scope.isListingFieldSelected = (field) => {
      return $scope.selectedListingsFields[field];
    };
    $scope.getSelectedListingsFields = () => {
      return Object.keys($scope.selectedListingsFields).filter(
        (field) =>
          $scope.selectedListingsFields[
            field as keyof CreateBulkUpdateToolPageComponentScope["selectedListingsFields"]
          ],
      ) as Array<
        keyof CreateBulkUpdateToolPageComponentScope["selectedListingsFields"]
      >;
    };
    $scope.handleCreateTool = async () => {
      const toolId = `${Date.now()}`;
      const selectedFields = $scope.getSelectedListingsFields();
      if (selectedFields.length === 0) {
        // handle error here
        return;
      }
      if (!$scope.toolName) {
        // handle error here
        return;
      }
      await ToolService.createTool({
        id: toolId,
        type: "bulk-update",
        name: $scope.toolName,
        description: $scope.toolDescription,
        domain: $scope.domain,
        fields: selectedFields,
      });
      // handle success here
      createToolSuccessListener();
    };
    let createToolSuccessListener = () => {};
    return {
      onCreateToolSuccess: (listener: () => void) => {
        createToolSuccessListener = listener;
      },
    };
  },
);

type ToolService = {
  createTool: (toolData: ToolData) => Promise<void>;
};
type ToolData = {
  id: string;
  type: "bulk-update" | "report";
  name: string;
  description: string;
  domain: string;
  fields: string[];
};
app.service<ToolService>("ToolService", (IDBService: IndexDbService) => {
  return {
    createTool: async (toolData) => {
      const existingTools =
        (await IDBService.retrieveFromIDB<{
          [key: string]: any;
        }>({
          dbName: "luftballoons-tools",
          key: "all-tools",
        })) || {};
      const updatedTools = {
        ...existingTools,
        [toolData.id]: toolData,
      };
      await IDBService.storeToIDB({
        dbName: "luftballoons-tools",
        key: "all-tools",
        data: updatedTools,
      });
    },
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
