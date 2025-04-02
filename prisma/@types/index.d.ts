import type {
  PermActions,
  PermissionResource,
} from '../../src/casl/casl-ability.service';

declare global {
  namespace PrismaJson {
    type PermissionsList = Array<{
      action: PermActions;
      resource: PermissionResource;
      condition?: Record<string, any>;
    }>;
  }
}
