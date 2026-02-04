export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
}

export enum CommonStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum ProjectStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export enum BidStatus {
  DRAFT = "draft",
  SUBMITTED = "submitted",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum InvoiceStatus {
  PENDING = "pending",
  PAID = "paid",
  OVERDUE = "overdue",
}

export enum NotificationStatus {
  UNREAD = "unread",
  READ = "read",
}

export enum ClientStatus {
  LEAD = "lead",
  PROPOSAL = "proposal",
  PROJECT = "project",
  COMPLETED = "completed",
}

export enum CommunicationType {
  EMAIL = "email",
  CALL = "call",
  MESSAGE = "message",
}

export enum MaterialType {
  MATERIAL = "material",
  LABOR = "labor",
  SUBCONTRACTOR = "subcontractor",
}
