import { AxiosError } from "axios";
import { ZodError } from "zod";

type ErrorType = "schema" | "http";

export class SyncError {
  public readonly type: ErrorType;
  public readonly code: number = 0;
  public readonly error: unknown;

  constructor(error: unknown) {
    if (error instanceof AxiosError) {
      this.type = "http";
      this.code = error.response?.status ?? 0;
    } else {
      console.error("API response does not match expected schema", { error });
      this.type = "schema";
    }
  }

  get isCritical(): boolean {
    return ![403, 404, 500, 0].includes(this.code);
  }

  get title(): string {
    return "Source indéterminée";
  }
}

export class NomenclatureSyncError extends SyncError {
  constructor(error: unknown, public readonly id: string) {
    super(error);
  }

  get title(): string {
    return `Nomenclature ${this.id}`;
  }
}

export class QuestionnaireSyncError extends SyncError {
  constructor(error: unknown, public readonly id: string) {
    super(error);
  }

  get message(): string {
    return `Questionnaire ${this.id}`;
  }
}

export class CampaignSyncError extends SyncError {
  constructor(error: unknown, public readonly id: string) {
    super(error);
  }

  get title(): string {
    return `Campagne ${this.id}`;
  }
}

export class SurveyUnitSyncError extends SyncError {
  constructor(
    error: unknown,
    public readonly id: string,
    public readonly campaignId: string
  ) {
    super(error);
  }

  get title(): string {
    return `L'unité enqueté ${this.id} de la campagne ${this.campaignId}`;
  }
}
