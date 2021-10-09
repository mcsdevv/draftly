-- CreateTable
CREATE TABLE `teams` (
    `tuid` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `protected` BOOLEAN NOT NULL,
    `handle` VARCHAR(191) NOT NULL DEFAULT '',
    `avatar` VARCHAR(191) NOT NULL DEFAULT '',
    `plan` VARCHAR(191) NOT NULL DEFAULT '',
    `token_secret` VARCHAR(191) NOT NULL DEFAULT '',
    `token_key` VARCHAR(191) NOT NULL DEFAULT '',
    `invite_code` VARCHAR(191) NOT NULL DEFAULT '',
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `reviews_required` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `teams_handle_key`(`handle`),
    INDEX `teams.handle_index`(`handle`),
    PRIMARY KEY (`tuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tweets` (
    `twuid` VARCHAR(191) NOT NULL DEFAULT '',
    `tuid` VARCHAR(191) DEFAULT '',
    `campaign` VARCHAR(191) NOT NULL DEFAULT '',
    `type` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `metrics_updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tweet_id` VARCHAR(191) NOT NULL,
    `impressions` INTEGER NOT NULL DEFAULT 0,
    `retweets` INTEGER NOT NULL DEFAULT 0,
    `quote_retweets` INTEGER NOT NULL DEFAULT 0,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `replies` INTEGER NOT NULL DEFAULT 0,
    `url_clicks` INTEGER NOT NULL DEFAULT 0,
    `profile_clicks` INTEGER NOT NULL DEFAULT 0,
    `url` VARCHAR(191),

    PRIMARY KEY (`twuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `approvals` (
    `tauid` VARCHAR(191) NOT NULL,
    `twuid` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL DEFAULT 'requested',

    PRIMARY KEY (`tauid`, `twuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `tcuid` VARCHAR(191) NOT NULL,
    `twuid` VARCHAR(191),
    `added_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`tcuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `metadata` (
    `url` VARCHAR(191) NOT NULL DEFAULT '',
    `og_url` VARCHAR(191),
    `og_type` VARCHAR(191),
    `og_title` VARCHAR(191),
    `og_img` VARCHAR(191),
    `og_description` VARCHAR(191),
    `canonical` VARCHAR(191),
    `twitter_site_title` VARCHAR(191),
    `twitter_site_id` VARCHAR(191),
    `twitter_site` VARCHAR(191),
    `twitter_player_width` VARCHAR(191),
    `twitter_player_stream` VARCHAR(191),
    `twitter_player_height` VARCHAR(191),
    `twitter_player` VARCHAR(191),
    `twitter_img_src` VARCHAR(191),
    `twitter_img_alt` VARCHAR(191),
    `twitter_img` VARCHAR(191),
    `twitter_domain` VARCHAR(191),
    `twitter_description` VARCHAR(191),
    `twitter_creator_id` VARCHAR(191),
    `twitter_creator` VARCHAR(191),
    `twitter_card` VARCHAR(191),
    `twitter_app_url_ipad` VARCHAR(191),
    `twitter_app_id_ipad` VARCHAR(191),
    `twitter_app_name_ipad` VARCHAR(191),
    `twitter_app_url_iphone` VARCHAR(191),
    `twitter_app_id_iphone` VARCHAR(191),
    `twitter_app_name_iphone` VARCHAR(191),
    `twitter_app_url_googleplay` VARCHAR(191),
    `twitter_app_id_googleplay` VARCHAR(191),
    `twitter_app_name_googleplay` VARCHAR(191),
    `twitter_title` VARCHAR(191),
    `cardType` VARCHAR(191),
    `fallbackImg` BOOLEAN,

    UNIQUE INDEX `metadata_url_key`(`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `uid` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `picture` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `uid` VARCHAR(191) DEFAULT '',
    `tuid` VARCHAR(191) DEFAULT '',
    `role` VARCHAR(191) NOT NULL DEFAULT 'member',
    `tmuid` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`tmuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
