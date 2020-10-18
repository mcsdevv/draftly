# Migration `20201007000907-creator`

This migration has been generated by mcsdevv at 10/7/2020, 1:09:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."teams" ADD FOREIGN KEY ("created_by")REFERENCES "public"."users"("uid") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."tweets" ADD FOREIGN KEY ("created_by")REFERENCES "public"."users"("uid") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201004225901-review-type..20201007000907-creator
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model teams {
   tuid            String    @id @default("")
@@ -20,8 +20,9 @@
   inviteCode      String    @default("") @map("invite_code")
   updatedAt       DateTime  @default(now()) @map("updated_at")
   createdAt       DateTime  @default(now()) @map("created_at")
   createdBy       String    @map("created_by")
+  creator         users     @relation(fields: [createdBy], references: [uid])
   members         members[]
   tweets          tweets[]
   @@index([handle])
@@ -50,8 +51,9 @@
   tweetId          String      @map("tweet_id")
   retweets         Int
   replies          Int
   favorites        Int
+  creator          users       @relation(fields: [createdBy], references: [uid])
   team             teams       @relation(fields: [tuid], references: [tuid])
   approvals        approvals[]
   comments         comments[]
   metadata         metadata?
@@ -122,5 +124,7 @@
   picture   String    @default("")
   createdAt DateTime  @default(now()) @map("created_at")
   updatedAt DateTime  @default(now()) @map("updated_at")
   members   members[]
+  teams     teams[]
+  tweets    tweets[]
 }
```

