import type { BrandFormValues, BrandResult, FalVisualAsset, StoredProject } from "@/lib/types";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export interface ProfileRow {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProjectRow {
  id: string;
  user_id: string;
  title: string;
  business_idea: string;
  input_data: JsonValue;
  brand_data: JsonValue;
  trust_score: JsonValue;
  language: string | null;
  theme: string | null;
  created_at: string;
  updated_at: string;
}

export interface VisualAssetRow {
  id: string;
  project_id: string;
  user_id: string;
  type: string;
  title: string;
  prompt: string;
  image_url: string | null;
  status: string;
  created_at: string;
}

export interface UserPreferenceRow {
  id: string;
  user_id: string;
  language: string | null;
  theme: string | null;
  created_at: string;
  updated_at: string;
}

export interface SaveProjectInput {
  projectId: string;
  userId: string;
  title: string;
  form: BrandFormValues;
  brand: BrandResult;
  visuals: FalVisualAsset[];
  createdAt?: string;
}

export interface SaveResult {
  ok: boolean;
  source: "supabase" | "local";
  message?: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Omit<ProfileRow, "created_at"> & { created_at?: string };
        Update: Partial<Omit<ProfileRow, "id" | "created_at">>;
      };
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<ProjectRow, "id" | "user_id" | "created_at">> & {
          updated_at?: string;
        };
      };
      visual_assets: {
        Row: VisualAssetRow;
        Insert: Omit<VisualAssetRow, "created_at"> & { created_at?: string };
        Update: Partial<Omit<VisualAssetRow, "id" | "user_id" | "project_id" | "created_at">>;
      };
      user_preferences: {
        Row: UserPreferenceRow;
        Insert: Omit<UserPreferenceRow, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<UserPreferenceRow, "id" | "user_id" | "created_at">> & {
          updated_at?: string;
        };
      };
    };
  };
}

export interface StoredProjectRecord extends StoredProject {
  source: "supabase" | "local";
}
