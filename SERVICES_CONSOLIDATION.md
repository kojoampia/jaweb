# Core Services Consolidation

## Overview
Successfully consolidated duplicate service implementations across `/app/core/services/` and `/app/core/util/` folders. The codebase now has a single source of truth for each service.

## Architecture Changes

### Primary Location: `/app/core/services/`
All modern implementations are now in this centralized location:

1. **EventManagerService** - RxJS-based pub/sub event system
   - Replaces JhiEventManager from ng-jhipster
   - Includes EventWithContent model
   - Methods: subscribe(), broadcast(), destroy()

2. **ParseLinksService** - HTTP Link header pagination parsing
   - Supports modern and legacy naming (parseLinks, parse, parseAll)
   - Handles URLSearchParams for query parsing
   - Backward compatible interface

3. **AlertService** - Alert and notification system
   - Alert interface with type, message, translationKey, timeout, etc.
   - Methods: addAlert(), closeAlert(), getAlerts(), clear()
   - Convenience methods: success(), error(), warning(), info()

4. **DataUtilsService** - File and blob operations
   - byteSize() - Format base64 size as human-readable string
   - openFile() - Open file as binary with type
   - downloadFile() - Download blob with custom name
   - byteString64ToBlob() - Convert base64 to Blob
   - abbreviate() - Truncate text to 30 chars with ellipsis

5. **StorageService** - Signal-based localStorage persistence
   - createLocalStorageSignal<T>() - Create persistent signal
   - Automatic effect() syncing to localStorage
   - Static PREFIX constant for namespace

6. **DateUtilsService** - dayjs-based date operations
   - Modern replacement for moment.js
   - Plugins: customParseFormat, duration
   - Methods: parseDate(), formatDate(), isValid(), add(), subtract(), isBefore(), isSame()

### Backward Compatibility: `/app/core/util/`
Legacy files now act as re-export bridges to maintain backward compatibility:

- `data-util.service.ts` → re-exports DataUtilsService as DataUtils
- `parse-links.service.ts` → re-exports ParseLinksService as ParseLinks
- `alert.service.ts` → re-exports AlertService with Alert type
- `event-manager.service.ts` → re-exports EventManagerService as EventManager
- Spec files remain for testing

### Non-Service Utilities
Actual utility files (not services) retained in `/app/shared/util/`:

- `datepicker-adapter.ts` - Deprecated, empty stub
- `request-util.ts` - HTTP request utilities

Real utilities in `/app/core/util/`:

- `operators.ts` - RxJS helper functions (isPresent, filterNaN)

## Import Consolidation

### Recommended Imports (Primary)
```typescript
// Import from centralized location
import { 
  EventManagerService, 
  ParseLinksService, 
  AlertService, 
  DataUtilsService,
  StorageService,
  DateUtilsService 
} from 'app/core/services';

// Or from main core export
import { 
  EventManagerService, 
  AlertService 
} from 'app/core';
```

### Legacy Imports (Still Supported)
```typescript
// These still work via re-exports
import { EventManager } from 'app/core/util/event-manager.service';
import { ParseLinks } from 'app/core/util/parse-links.service';
import { AlertService } from 'app/core/util/alert.service';
import { DataUtils } from 'app/core/util/data-util.service';
```

## Benefits

1. **Single Source of Truth** - One implementation per service eliminates duplicate code
2. **Easier Maintenance** - Changes only needed in one place
3. **Cleaner Structure** - Clear separation between services and utilities
4. **Backward Compatible** - Legacy imports continue to work via re-exports
5. **Better Organization** - All modern services in central `/app/core/services/` location
6. **Type Safety** - Proper TypeScript interfaces exported consistently

## Migration Path

### For New Code
Always import from `app/core/services` or `app/core`:
```typescript
import { EventManagerService } from 'app/core/services';
```

### For Existing Code
No changes required - re-exports maintain compatibility. But can be updated to:
```typescript
import { EventManager as EventManagerService } from 'app/core/util/event-manager.service';
// or preferably
import { EventManagerService } from 'app/core/services';
```

## File Structure

```
/app/core/
├── services/ (PRIMARY LOCATION - Modern implementations)
│   ├── event-manager.service.ts
│   ├── parse-links.service.ts
│   ├── alert.service.ts
│   ├── data-utils.service.ts
│   ├── storage.service.ts
│   ├── date-utils.service.ts
│   └── index.ts (barrel export)
├── util/ (BACKWARD COMPATIBILITY - Re-exports only)
│   ├── event-manager.service.ts (→ services/event-manager.service.ts)
│   ├── parse-links.service.ts (→ services/parse-links.service.ts)
│   ├── alert.service.ts (→ services/alert.service.ts)
│   ├── data-util.service.ts (→ services/data-utils.service.ts)
│   ├── operators.ts (REAL UTILITY - stays here)
│   ├── *.spec.ts (test files reference re-exports)
├── index.ts (exports from services)
├── auth/ (Authentication services)
├── login/ (Login services)
├── user/ (User services)
├── config/ (Configuration services)
├── tracker/ (Window tracking service)
└── ... (other core modules)
```

## Spec Files Status

Test files in `/app/core/util/` continue to work because:
1. Re-export files maintain the same interface
2. Spec files import from re-export files
3. Re-exports point to actual implementations in `/app/core/services/`

The test infrastructure remains unchanged and functional.

## Current Components Using New Services

All 20+ modernized components use the centralized `/app/core/services/` location:
- Career, Service, Slide components
- Authority, Privilege components
- Blog, BlogView components
- About, Partner, Portfolio components
- Audits component
- And more...

## Notes

- All services use Angular 19's `providedIn: 'root'` for tree-shaking
- No changes to core.module.ts required (services use providedIn)
- Re-exports maintain full backward compatibility during transition
- Future goal: Remove `/app/core/util/` re-exports once all legacy code migrated
