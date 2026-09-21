// Technology-specific editorial inputs. These populate the existing page schema;
// they never create technologies or categories.
export const technologyProfiles: Record<string, { focus: string; topics: [string, string][] }> = {
  php: {focus:'server-rendered applications and maintainable web APIs', topics:[['Modern PHP applications','Typed services, Composer packages, and clear request handling'],['Secure customer portals','Session authentication, input validation, and permission checks'],['Database-backed workflows','PDO queries, transactions, and relational data modeling'],['Production PHP delivery','PHP-FPM configuration, automated tests, and OPcache tuning']]},
  laravel: {focus:'structured Laravel applications and scalable backend services', topics:[['Eloquent data architecture','Relationships, migrations, indexes, and transaction boundaries'],['Authenticated REST APIs','Request validation, policies, and token-based access'],['Queued business workflows','Background jobs, retries, scheduled tasks, and notifications'],['Laravel operations','Integration tests, queue monitoring, caching, and controlled releases']]},
  wordpress: {focus:'editor-friendly websites with custom WordPress functionality', topics:[['Custom themes and blocks','Responsive templates and reusable Gutenberg content blocks'],['Content publishing workflows','Custom post types, taxonomies, and editor permissions'],['Plugin integrations','Forms, search, CRM connections, and carefully scoped extensions'],['WordPress maintenance','Caching, backups, staging updates, and plugin compatibility checks']]},
  woocommerce: {focus:'WordPress commerce with tailored catalog and checkout workflows', topics:[['Product catalog setup','Variable products, attributes, stock rules, and product imports'],['Payments and checkout','Payment gateways, checkout fields, and order confirmation flows'],['Shipping and extensions','Shipping zones, delivery rules, and extension compatibility'],['Store performance','Product query tuning, cache exclusions, and end-to-end purchase tests']]},
  magento: {focus:'custom Magento stores with complex catalog and order requirements', topics:[['Magento catalog architecture','Attribute sets, configurable products, and category navigation'],['Custom modules and themes','Dependency injection, layout XML, and responsive storefront components'],['Commerce integrations','Inventory synchronization, payment methods, and shipping services'],['Magento release operations','Indexers, cache invalidation, queue consumers, and checkout regression tests']]},
  adobecommerce: {focus:'enterprise commerce experiences on Adobe Commerce', topics:[['Multi-store commerce','Store views, shared catalogs, and regional configuration'],['B2B buying workflows','Company accounts, negotiated quotes, and purchasing permissions'],['Enterprise integrations','ERP product feeds, inventory updates, and order synchronization'],['Commerce reliability','Staging validation, indexing, cache tuning, and deployment rollback planning']]},
  drupalcommerce: {focus:'content-rich commerce built with Drupal entities and workflows', topics:[['Product entity modeling','Product variations, attributes, and structured editorial content'],['Custom checkout flows','Order types, checkout panes, and customer account journeys'],['Payment and shipping plugins','Gateway integrations, shipping rules, and order state transitions'],['Drupal store delivery','Configuration management, access checks, caching, and purchase testing']]},
  moodle: {focus:'learning platforms with structured courses and learner management', topics:[['Course architecture','Course categories, activities, resources, and completion rules'],['Learner administration','Enrollment methods, cohorts, roles, and instructor access'],['Assessment workflows','Question banks, quizzes, grading, and learning reports'],['Learning platform operations','Plugin compatibility, backups, scheduled tasks, and upgrade testing']]},
  vuejs: {focus:'reactive interfaces using Vue components and the Composition API', topics:[['Vue component systems','Single-file components, props, events, and composable logic'],['Interactive dashboards','Vue Router navigation, Pinia state, and accessible data views'],['API-connected interfaces','Loading states, form validation, and recoverable request errors'],['Vue performance','Lazy routes, bundle analysis, and component interaction tests']]},
  angular: {focus:'structured Angular applications for complex business interfaces', topics:[['Angular application architecture','Standalone components, dependency injection, and route organization'],['Business forms and workflows','Typed reactive forms, validation, and role-aware navigation'],['Reactive data integration','HttpClient services, RxJS streams, and predictable UI state'],['Angular delivery','Component tests, route splitting, accessibility checks, and production builds']]},
  typescript: {focus:'typed JavaScript systems with explicit contracts and safer refactoring', topics:[['Domain type modeling','Unions, generics, and reusable types for business rules'],['API contract integration','Typed request models with runtime validation at boundaries'],['JavaScript migration','Incremental strictness, declaration files, and dependency compatibility'],['Type-safe delivery','Compiler checks, shared packages, and regression tests in CI']]},
  javascript: {focus:'interactive web applications and browser integrations', topics:[['Browser interactions','DOM events, accessible controls, and modular UI behavior'],['Asynchronous workflows','Fetch requests, promises, cancellation, and error recovery'],['Reusable application modules','ES modules, state boundaries, and dependency organization'],['JavaScript performance','Code splitting, profiling, browser tests, and bundle optimization']]},
  tailwindcss: {focus:'responsive interfaces using a consistent utility-based design system', topics:[['Design token mapping','Shared colors, typography, spacing, and theme configuration'],['Reusable UI patterns','Consistent cards, forms, navigation, and component variants'],['Responsive layouts','Breakpoint behavior, container sizing, and readable mobile content'],['UI quality checks','Focus states, contrast checks, production CSS, and visual regression review']]},
  python: {focus:'Python services, data workflows, and business automation', topics:[['Python API services','Validated inputs, modular application logic, and documented endpoints'],['Data processing pipelines','Parsing, transformation, validation, and repeatable batch jobs'],['Business automation','Scheduled scripts, third-party API clients, and task queues'],['Python service operations','Virtual environments, dependency management, automated tests, and logging']]},
  mysql: {focus:'relational data systems with reliable queries and transactions', topics:[['Relational schema design','Tables, keys, constraints, and migration planning'],['Transactional workflows','Atomic updates, isolation choices, and deadlock handling'],['Query optimization','Execution plans, composite indexes, and slow query analysis'],['Database operations','Backup restoration drills, access controls, and replication monitoring']]},
  mongodb: {focus:'document-oriented data systems for evolving application models', topics:[['Document data modeling','Embedding versus references, schema validation, and index design'],['Aggregation workflows','Pipelines for reporting, filtering, and grouped application views'],['Application integrations','Driver access, pagination, connection pooling, and transaction boundaries'],['MongoDB operations','Replica-set planning, backup recovery, query profiling, and access controls']]},
  firebase: {focus:'managed application services using Firebase authentication and data tools', topics:[['Authenticated applications','Sign-in providers, session handling, and account lifecycle flows'],['Firestore data design','Document structure, query indexes, and real-time subscriptions'],['Serverless integrations','Cloud Functions, storage workflows, and event processing'],['Firebase release checks','Security Rules tests, emulator validation, usage monitoring, and deployment checks']]},
  docker: {focus:'reproducible container environments from development to deployment', topics:[['Application containerization','Multi-stage Dockerfiles, lean images, and explicit runtime dependencies'],['Local service environments','Compose networks, persistent volumes, and service health checks'],['Container delivery pipelines','Image builds, registry publishing, scanning, and versioned releases'],['Runtime operations','Resource limits, secrets injection, log collection, and rollback validation']]},
  github: {focus:'collaborative software delivery with GitHub repositories and Actions', topics:[['Repository workflows','Branch policies, pull request reviews, and issue organization'],['GitHub Actions automation','Build, lint, test, and artifact publishing workflows'],['Release management','Version tags, deployment environments, and approval boundaries'],['Repository security','Scoped workflow permissions, dependency review, and secret handling']]},
  vercel: {focus:'web application deployment with preview environments and managed delivery', topics:[['Frontend deployment','Framework builds, output configuration, and environment variables'],['Preview collaboration','Branch previews, review workflows, and production promotion'],['Application integrations','Server functions, external data services, and cache behavior'],['Production observability','Domain setup, request monitoring, performance checks, and rollback rehearsals']]},
  supabase: {focus:'PostgreSQL-backed applications with managed authentication and realtime data', topics:[['PostgreSQL schema design','Relational tables, migrations, indexes, and database functions'],['Authentication and authorization','User sessions, row-level security policies, and role boundaries'],['Realtime and storage','Change subscriptions, storage buckets, and access-controlled files'],['Backend delivery','Local development, policy tests, migration review, and backup planning']]},
  reactnative: {focus:'shared React-based mobile applications for iOS and Android', topics:[['Native mobile interfaces','Reusable screens, navigation, platform conventions, and accessible controls'],['Mobile data workflows','API integration, local persistence, offline states, and synchronization'],['Device integrations','Camera access, push notifications, permissions, and native modules'],['Mobile release delivery','Device testing, crash reporting, signing, and app store submission preparation']]},
  swift: {focus:'native iOS applications using Swift and Apple platform capabilities', topics:[['SwiftUI interfaces','State-driven screens, navigation, accessibility, and adaptive layouts'],['iOS data architecture','Async networking, model decoding, local persistence, and error handling'],['Apple platform integrations','Notifications, camera permissions, background work, and system services'],['iOS release preparation','XCTest coverage, device profiling, signing, and TestFlight validation']]},
  kotlin: {focus:'native Android applications using Kotlin and Jetpack libraries', topics:[['Compose interfaces','Reusable composables, navigation, adaptive layouts, and accessibility'],['Android application architecture','ViewModels, coroutines, Flow streams, and lifecycle-aware state'],['Offline-capable experiences','Room persistence, WorkManager jobs, and reliable data synchronization'],['Android release preparation','Device coverage, instrumentation tests, build signing, and Play release checks']]},
  expressjs: {"focus": "HTTP services and middleware-based APIs on Express", "topics": [["REST endpoint design", "Routers, request validation, status codes, and API contracts"], ["Authentication middleware", "Session or token checks, authorization, and rate limiting"], ["Database integrations", "Repository modules, connection pooling, and asynchronous error handling"], ["Express production delivery", "Integration tests, reverse proxy configuration, logging, and graceful shutdown"]]},
  gogolang: {"focus": "concurrent services and command-line tools built with Go", "topics": [["Go service architecture", "Small packages, explicit interfaces, and dependency boundaries"], ["Concurrent workloads", "Goroutines, channels, cancellation, and bounded worker pools"], ["Network and data services", "HTTP handlers, database access, and structured error handling"], ["Go release engineering", "Race detection, profiling, binary builds, and container deployment"]]},
  graphql: {"focus": "schema-driven APIs with precise client data queries", "topics": [["GraphQL schema modeling", "Object types, input types, queries, and mutation contracts"], ["Resolver implementation", "Data loaders, service boundaries, and efficient database access"], ["Authorized client queries", "Resolver permissions, input validation, and query complexity limits"], ["GraphQL delivery", "Schema compatibility tests, client operation checks, and resolver monitoring"]]},
  postgresql: {"focus": "relational applications with PostgreSQL transactions and advanced queries", "topics": [["PostgreSQL schema modeling", "Keys, constraints, migrations, and normalized relationships"], ["Reliable business transactions", "Isolation levels, row locks, and transactional consistency"], ["Analytical queries", "Window functions, JSONB queries, and index-backed reports"], ["PostgreSQL operations", "EXPLAIN analysis, vacuum monitoring, backups, and recovery drills"]]},
  pwa: {"focus": "installable web experiences with resilient offline behavior", "topics": [["Installable application shell", "Web app manifests, icons, responsive layouts, and launch behavior"], ["Offline content access", "Service worker caches, network fallbacks, and update strategies"], ["Resilient data workflows", "IndexedDB persistence, queued changes, and synchronization conflicts"], ["PWA release validation", "Offline testing, browser compatibility, cache upgrades, and install checks"]]},
  strapiheadless: {"focus": "API-first content management with Strapi", "topics": [["Content type architecture", "Collections, reusable components, relations, and validation rules"], ["Editorial workflows", "Draft publishing, editor roles, and media organization"], ["Frontend content APIs", "REST or GraphQL consumers, filtering, and access permissions"], ["Strapi operations", "Database migrations, backups, deployment configuration, and API tests"]]},
  sanityio: {"focus": "structured publishing and collaborative editing with Sanity", "topics": [["Content schema design", "Document types, references, validation, and reusable content objects"], ["Customized editorial studio", "Editor inputs, previews, and publishing workflows"], ["GROQ content integration", "Parameterized queries, image delivery, and frontend rendering"], ["Content release checks", "Dataset migration, webhook validation, permissions, and preview testing"]]},
  googlecloud: {"focus": "managed application infrastructure and data services on Google Cloud", "topics": [["Cloud foundation design", "Project structure, IAM roles, service accounts, and network boundaries"], ["Application hosting", "Cloud Run containers, runtime configuration, and managed service connections"], ["Data processing systems", "Cloud Storage ingestion, BigQuery datasets, and scheduled transformations"], ["Cloud operations", "Deployment automation, logs, alerting, budgets, and recovery planning"]]},
  kubernetes: {"focus": "orchestrated container workloads with Kubernetes", "topics": [["Workload architecture", "Deployments, services, namespaces, and configuration boundaries"], ["Reliable container scheduling", "Readiness probes, resource requests, limits, and rolling updates"], ["Service connectivity", "Ingress routing, network policies, secrets, and persistent storage"], ["Cluster operations", "Autoscaling checks, metrics, deployment rollback, and workload recovery"]]},
  terraform: {"focus": "reviewable infrastructure provisioning through Terraform", "topics": [["Infrastructure module design", "Reusable modules, variable contracts, and provider configuration"], ["Environment isolation", "Remote state, locking, access permissions, and environment inputs"], ["Infrastructure delivery pipelines", "Plan review, controlled apply steps, and drift detection"], ["Infrastructure lifecycle management", "Resource imports, dependency ordering, state recovery, and change documentation"]]},
  openaigpt4: {"focus": "language-model features integrated into existing application workflows", "topics": [["Assistant workflow design", "Task instructions, user context, output formats, and failure handling"], ["Knowledge-grounded responses", "Document retrieval, source references, and context selection"], ["Application tool integration", "Validated tool inputs, authorization boundaries, and human review points"], ["AI feature evaluation", "Representative test sets, response quality checks, latency monitoring, and usage limits"]]},
  pineconedb: {"focus": "managed vector search for document retrieval and semantic discovery", "topics": [["Vector index planning", "Embedding dimensions, similarity metrics, namespaces, and metadata schemas"], ["Knowledge ingestion", "Chunking, embedding generation, batched upserts, and source tracking"], ["Semantic retrieval", "Metadata filters, relevance ranking, and application search integration"], ["Retrieval quality operations", "Evaluation queries, freshness checks, deletions, and latency monitoring"]]},
  redis: {"focus": "low-latency caching and transient application data with Redis", "topics": [["Application caching", "Key conventions, expiry policies, invalidation, and cache-aside reads"], ["Session and rate-limit data", "Atomic counters, expiry windows, and session lifecycle handling"], ["Event-driven workflows", "Streams, consumer groups, acknowledgments, and retry handling"], ["Redis reliability", "Memory limits, eviction policies, persistence choices, and failover testing"]]},
  langchain: {"focus": "language-model workflows connecting retrieval, prompts, and tools", "topics": [["Retrieval workflow design", "Document loaders, text splitting, embedding stores, and retrieval stages"], ["Composed model workflows", "Prompt templates, structured outputs, and model integration boundaries"], ["Tool-enabled assistants", "Validated tool calls, scoped permissions, and explicit review steps"], ["Workflow evaluation", "Representative datasets, tracing, error recovery, and latency measurement"]]},
  tensorflow: {"focus": "machine learning pipelines from training data to inference", "topics": [["Training data pipelines", "Dataset validation, preprocessing, batching, and train-test separation"], ["Model development", "Keras architectures, loss functions, metrics, and training experiments"], ["Inference integration", "Saved model export, serving endpoints, and application input validation"], ["Model quality operations", "Evaluation baselines, performance profiling, versioning, and drift monitoring"]]},
};

export const technologyUseCases: Record<string, {title:string; desc:string}[]> = {
  "php": [
    {
      "title": "Customer account portals",
      "desc": "Manage profiles, permissions, and authenticated account actions."
    },
    {
      "title": "Internal business tools",
      "desc": "Build server-rendered forms for approvals, reporting, and daily operations."
    },
    {
      "title": "Legacy PHP modernization",
      "desc": "Replace tightly coupled scripts with tested services and maintained packages."
    },
    {
      "title": "Partner integration APIs",
      "desc": "Connect existing PHP applications to billing, CRM, and third-party services."
    }
  ],
  "laravel": [
    {
      "title": "Subscription SaaS platforms",
      "desc": "Manage tenant data, user roles, billing events, and queued notifications."
    },
    {
      "title": "Order processing backends",
      "desc": "Coordinate transactions, stock updates, and asynchronous fulfillment jobs."
    },
    {
      "title": "Mobile application APIs",
      "desc": "Expose validated REST endpoints with token authentication and access policies."
    },
    {
      "title": "Operations management portals",
      "desc": "Model business relationships with Eloquent and build auditable approval workflows."
    }
  ],
  "woocommerce": [
    {
      "title": "WordPress retail stores",
      "desc": "Turn an editorial website into a store with searchable product catalogs."
    },
    {
      "title": "Configurable product stores",
      "desc": "Offer product variations, attribute filters, and inventory-aware purchase flows."
    },
    {
      "title": "Regional delivery shops",
      "desc": "Configure shipping zones, payment gateways, and checkout fields for local orders."
    },
    {
      "title": "Extension-based commerce",
      "desc": "Integrate subscriptions or memberships after validating plugin compatibility and checkout behavior."
    }
  ],
  "wordpress": [
    {
      "title": "Business publishing websites",
      "desc": "Give editors reusable blocks for service pages, articles, and landing pages."
    },
    {
      "title": "Resource libraries",
      "desc": "Organize downloadable material with custom post types and taxonomies."
    },
    {
      "title": "Lead generation websites",
      "desc": "Connect validated forms to CRM and email workflows."
    },
    {
      "title": "Multi-author publications",
      "desc": "Separate author and editor roles with review and publishing permissions."
    }
  ],
  "reactnative": [
    {
      "title": "Customer service apps",
      "desc": "Share React screens across iOS and Android for account and support journeys."
    },
    {
      "title": "Field workforce apps",
      "desc": "Capture updates offline and synchronize them when connectivity returns."
    },
    {
      "title": "Commerce companion apps",
      "desc": "Connect product discovery, checkout integrations, and order notifications."
    },
    {
      "title": "Device-enabled workflows",
      "desc": "Integrate camera capture, push notifications, and platform permission prompts."
    }
  ],
  "mysql": [
    {
      "title": "Transactional order systems",
      "desc": "Keep orders, payments, and stock changes consistent across related tables."
    },
    {
      "title": "Business reporting databases",
      "desc": "Use indexed relational queries for operational reports and dashboards."
    },
    {
      "title": "Customer management systems",
      "desc": "Model account relationships with constraints and controlled access."
    },
    {
      "title": "Database performance projects",
      "desc": "Tune slow queries and validate backup restoration for existing MySQL applications."
    }
  ],
  "mongodb": [
    {
      "title": "Product catalog services",
      "desc": "Store flexible product attributes with validation and searchable indexes."
    },
    {
      "title": "Content-rich applications",
      "desc": "Model nested documents for structured articles and reusable content."
    },
    {
      "title": "Event analysis tools",
      "desc": "Aggregate activity documents into application reports."
    },
    {
      "title": "Evolving SaaS data models",
      "desc": "Support changing document structures with explicit migration and indexing plans."
    }
  ],
  "javascript": [
    {
      "title": "Interactive web forms",
      "desc": "Validate input and guide users through dynamic multi-step workflows."
    },
    {
      "title": "API-driven web interfaces",
      "desc": "Fetch application data with clear loading, empty, and error states."
    },
    {
      "title": "Browser integration widgets",
      "desc": "Embed modular interactive tools into existing websites."
    },
    {
      "title": "Frontend performance improvements",
      "desc": "Profile JavaScript execution and reduce unnecessary code and blocking work."
    }
  ],
  "typescript": [
    {
      "title": "Large frontend codebases",
      "desc": "Define component contracts and shared application state models."
    },
    {
      "title": "Shared web and API packages",
      "desc": "Reuse domain types while validating external data at runtime."
    },
    {
      "title": "Incremental JavaScript migrations",
      "desc": "Introduce compiler checks without rewriting every module at once."
    },
    {
      "title": "SDK and integration libraries",
      "desc": "Expose typed interfaces for application developers and partner integrations."
    }
  ]
};
