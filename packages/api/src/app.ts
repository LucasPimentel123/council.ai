import express from "express";
import cors from "cors";

// Infrastructure
import prisma from "./infrastructure/database/prisma.js";
import {
  PrismaProjectRepository,
  PrismaConversationRepository,
  PrismaMessageRepository,
  PrismaContextDocumentRepository,
} from "./infrastructure/database/repositories/index.js";

// Application - Services
import { EmbeddingService } from "./application/services/EmbeddingService.js";

// Application - Use Cases
import {
  CreateProject,
  GetProject,
  ListProjects,
  DeleteProject,
} from "./application/use-cases/project/index.js";
import {
  CreateConversation,
  GetConversation,
  ListConversations,
} from "./application/use-cases/conversation/index.js";
import {
  CreateMessage,
  SearchMessages,
  ListMessages,
} from "./application/use-cases/message/index.js";
import {
  UploadDocument,
  SearchDocuments,
  ListDocuments,
  DeleteDocument,
} from "./application/use-cases/document/index.js";

// Presentation - Controllers
import { ProjectController } from "./presentation/http/controllers/ProjectController.js";
import { ConversationController } from "./presentation/http/controllers/ConversationController.js";
import { MessageController } from "./presentation/http/controllers/MessageController.js";
import { DocumentController } from "./presentation/http/controllers/DocumentController.js";

// Presentation - Routes
import { healthRouter } from "./presentation/http/routes/health.js";
import { createProjectRouter } from "./presentation/http/routes/projects.js";
import {
  createConversationRouter,
  createProjectConversationRouter,
} from "./presentation/http/routes/conversations.js";
import {
  createMessageRouter,
  createConversationMessageRouter,
} from "./presentation/http/routes/messages.js";
import {
  createDocumentRouter,
  createProjectDocumentRouter,
} from "./presentation/http/routes/documents.js";

// Presentation - Middleware
import { errorHandler } from "./presentation/http/middleware/errorHandler.js";

export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Initialize repositories
  const projectRepository = new PrismaProjectRepository(prisma);
  const conversationRepository = new PrismaConversationRepository(prisma);
  const messageRepository = new PrismaMessageRepository(prisma);
  const documentRepository = new PrismaContextDocumentRepository(prisma);

  // Initialize services
  const embeddingService = new EmbeddingService();

  // Initialize use cases
  const createProject = new CreateProject(projectRepository);
  const getProject = new GetProject(projectRepository);
  const listProjects = new ListProjects(projectRepository);
  const deleteProject = new DeleteProject(projectRepository);

  const createConversation = new CreateConversation(
    conversationRepository,
    projectRepository
  );
  const getConversation = new GetConversation(
    conversationRepository,
    messageRepository
  );
  const listConversations = new ListConversations(conversationRepository);

  const createMessage = new CreateMessage(
    messageRepository,
    conversationRepository,
    embeddingService
  );
  const searchMessages = new SearchMessages(messageRepository, embeddingService);
  const listMessages = new ListMessages(messageRepository);

  const uploadDocument = new UploadDocument(
    documentRepository,
    projectRepository,
    embeddingService
  );
  const searchDocuments = new SearchDocuments(
    documentRepository,
    embeddingService
  );
  const listDocuments = new ListDocuments(documentRepository);
  const deleteDocument = new DeleteDocument(documentRepository);

  // Initialize controllers
  const projectController = new ProjectController(
    createProject,
    getProject,
    listProjects,
    deleteProject
  );

  const conversationController = new ConversationController(
    createConversation,
    getConversation,
    listConversations
  );

  const messageController = new MessageController(
    createMessage,
    searchMessages,
    listMessages
  );

  const documentController = new DocumentController(
    uploadDocument,
    searchDocuments,
    listDocuments,
    deleteDocument
  );

  // Routes
  app.use("/health", healthRouter);
  app.use("/projects", createProjectRouter(projectController));
  app.use(
    "/projects/:projectId/conversations",
    createProjectConversationRouter(conversationController)
  );
  app.use(
    "/projects/:projectId/documents",
    createProjectDocumentRouter(documentController)
  );
  app.use("/conversations", createConversationRouter(conversationController));
  app.use(
    "/conversations/:conversationId/messages",
    createConversationMessageRouter(messageController)
  );
  app.use("/messages", createMessageRouter(messageController));
  app.use("/documents", createDocumentRouter(documentController));

  // Error handling
  app.use(errorHandler);

  return app;
}
