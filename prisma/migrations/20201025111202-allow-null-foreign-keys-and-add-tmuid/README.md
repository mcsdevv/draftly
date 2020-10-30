# Migration `20201025111202-allow-null-foreign-keys-and-add-tmuid`

This migration has been generated by mcsdevv at 10/25/2020, 11:12:02 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."members" DROP CONSTRAINT "members_pkey",
ADD COLUMN "tmuid" text   NOT NULL DEFAULT E'',
ALTER COLUMN "uid" DROP NOT NULL,
ALTER COLUMN "tuid" DROP NOT NULL,
ADD PRIMARY KEY ("tmuid")

ALTER TABLE "public"."tweets" ALTER COLUMN "tuid" DROP NOT NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201024004529-added-by-for-comments..20201025111202-allow-null-foreign-keys-and-add-tmuid
--- datamodel.dml
+++ datamodel.dml
@@ -1,12 +1,12 @@
 generator client {
-  provider             = "prisma-client-js"
-  experimentalFeatures = ["connectOrCreate"]
+  provider        = "prisma-client-js"
+  previewFeatures = ["connectOrCreate"]
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model teams {
   tuid            String    @id @default("")
@@ -25,24 +25,14 @@
   creator         users     @relation(fields: [createdBy], references: [uid])
   members         members[]
   tweets          tweets[]
-  @@index([handle])
+  @@index([handle], name: "teams.handle_index")
 }
-model members {
-  uid  String @default("")
-  tuid String @default("")
-  role String @default("member")
-  team teams  @relation(fields: [tuid], references: [tuid])
-  user users  @relation(fields: [uid], references: [uid])
-
-  @@id([uid, tuid])
-}
-
 model tweets {
   twuid            String      @id @default("")
-  tuid             String      @default("")
+  tuid             String?     @default("")
   campaign         String      @default("")
   type             String
   text             String
   createdAt        DateTime    @default(now()) @map("created_at")
@@ -54,9 +44,9 @@
   replies          Int
   favorites        Int
   url              String?
   creator          users       @relation(fields: [createdBy], references: [uid])
-  team             teams       @relation(fields: [tuid], references: [tuid])
+  team             teams?      @relation(fields: [tuid], references: [tuid])
   metadata         metadata?   @relation(fields: [url], references: [url])
   approvals        approvals[]
   comments         comments[]
 }
@@ -71,14 +61,14 @@
 }
 model comments {
   tcuid   String   @id
-  twuid   String
+  twuid   String?
+  addedAt DateTime @default(now()) @map("added_at")
+  comment String
   uid     String
-  addedAt DateTime @default(now()) @map("added_at")
+  tweet   tweets?  @relation(fields: [twuid], references: [twuid])
   addedBy users    @relation(fields: [uid], references: [uid])
-  comment String
-  tweet   tweets   @relation(fields: [twuid], references: [twuid])
 }
 model metadata {
   url                         String   @unique @default("")
@@ -124,9 +114,18 @@
   name      String     @default("")
   picture   String     @default("")
   createdAt DateTime   @default(now()) @map("created_at")
   updatedAt DateTime   @default(now()) @map("updated_at")
+  comments  comments[]
   members   members[]
   teams     teams[]
   tweets    tweets[]
-  comments  comments[]
 }
+
+model members {
+  uid   String? @default("")
+  tuid  String? @default("")
+  role  String  @default("member")
+  tmuid String  @id @default("")
+  team  teams?  @relation(fields: [tuid], references: [tuid])
+  user  users?  @relation(fields: [uid], references: [uid])
+}
```

