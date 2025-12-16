const STORAGE_KEYS = {
  CONVERSATIONS: "chatbot-conversations",
  TEMPLATES: "chatbot-templates",
  FOLDERS: "chatbot-folders",
  SELECTED_ID: "chatbot-selected-id",
};

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  editedAt?: string;
}

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messageCount: number;
  preview: string;
  pinned: boolean;
  folder: string | null;
  messages: Message[];
}

export interface Template {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
}

// Load conversations from localStorage
export function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Error loading conversations:", error);
  }

  // Return initial data on first load
  return [];
}

// Save conversations to localStorage
export function saveConversations(conversations: Conversation[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      STORAGE_KEYS.CONVERSATIONS,
      JSON.stringify(conversations)
    );
  } catch (error) {
    console.error("Error saving conversations:", error);
  }
}

// Load templates from localStorage
export function loadTemplates(): Template[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Error loading templates:", error);
  }

  return [];
}

// Save templates to localStorage
export function saveTemplates(templates: Template[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  } catch (error) {
    console.error("Error saving templates:", error);
  }
}

// Load folders from localStorage
export function loadFolders(): Folder[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (error) {
    console.error("Error loading folders:", error);
  }

  return [];
}

// Save folders to localStorage
export function saveFolders(folders: Folder[]): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  } catch (error) {
    console.error("Error saving folders:", error);
  }
}

// Load selected conversation ID
export function loadSelectedId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_ID);
  } catch (error) {
    console.error("Error loading selected ID:", error);
    return null;
  }
}

// Save selected conversation ID
export function saveSelectedId(id: string | null): void {
  if (typeof window === "undefined") return;

  try {
    if (id) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_ID, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_ID);
    }
  } catch (error) {
    console.error("Error saving selected ID:", error);
  }
}

// Clear all data
export function clearAllData(): void {
  if (typeof window === "undefined") return;

  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}
