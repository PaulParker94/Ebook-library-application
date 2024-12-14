-- CreateTable
CREATE TABLE "auth_group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,

    CONSTRAINT "auth_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_group_permissions" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "auth_group_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_permission" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content_type_id" INTEGER NOT NULL,
    "codename" VARCHAR(100) NOT NULL,

    CONSTRAINT "auth_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_user" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "last_login" TIMESTAMPTZ(6),
    "is_superuser" BOOLEAN NOT NULL,
    "username" VARCHAR(150) NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "is_staff" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "date_joined" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_user_groups" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "auth_user_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_user_user_permissions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "auth_user_user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_book" (
    "id" SERIAL NOT NULL,
    "download_count" INTEGER,
    "gutenberg_id" INTEGER NOT NULL,
    "media_type" VARCHAR(16) NOT NULL,
    "title" VARCHAR(1024),
    "copyright" BOOLEAN,

    CONSTRAINT "books_book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_book_authors" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "books_book_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_book_bookshelves" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "bookshelf_id" INTEGER NOT NULL,

    CONSTRAINT "books_book_bookshelves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_book_languages" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,

    CONSTRAINT "books_book_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_book_subjects" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "books_book_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_book_translators" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "books_book_translators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_bookshelf" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "books_bookshelf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_format" (
    "id" SERIAL NOT NULL,
    "mime_type" VARCHAR(32) NOT NULL,
    "url" VARCHAR(256) NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "books_format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_language" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(4) NOT NULL,

    CONSTRAINT "books_language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_person" (
    "id" SERIAL NOT NULL,
    "birth_year" SMALLINT,
    "death_year" SMALLINT,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "books_author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books_subject" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,

    CONSTRAINT "books_subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_admin_log" (
    "id" SERIAL NOT NULL,
    "action_time" TIMESTAMPTZ(6) NOT NULL,
    "object_id" TEXT,
    "object_repr" VARCHAR(200) NOT NULL,
    "action_flag" SMALLINT NOT NULL,
    "change_message" TEXT NOT NULL,
    "content_type_id" INTEGER,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "django_admin_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_content_type" (
    "id" SERIAL NOT NULL,
    "app_label" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100) NOT NULL,

    CONSTRAINT "django_content_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_migrations" (
    "id" SERIAL NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "applied" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "django_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "django_session" (
    "session_key" VARCHAR(40) NOT NULL,
    "session_data" TEXT NOT NULL,
    "expire_date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "django_session_pkey" PRIMARY KEY ("session_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_group_name_key" ON "auth_group"("name");

-- CreateIndex
CREATE INDEX "auth_group_name_a6ea08ec_like" ON "auth_group"("name");

-- CreateIndex
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions"("group_id");

-- CreateIndex
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions"("group_id", "permission_id");

-- CreateIndex
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission"("content_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission"("content_type_id", "codename");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_username_key" ON "auth_user"("username");

-- CreateIndex
CREATE INDEX "auth_user_username_6821ab7c_like" ON "auth_user"("username");

-- CreateIndex
CREATE INDEX "auth_user_groups_group_id_97559544" ON "auth_user_groups"("group_id");

-- CreateIndex
CREATE INDEX "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups"("user_id", "group_id");

-- CreateIndex
CREATE INDEX "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions"("permission_id");

-- CreateIndex
CREATE INDEX "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions"("user_id", "permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_book_gutenberg_id_key" ON "books_book"("gutenberg_id");

-- CreateIndex
CREATE INDEX "books_book_authors_author_id_984f1ab8" ON "books_book_authors"("person_id");

-- CreateIndex
CREATE INDEX "books_book_authors_book_id_ed3433e7" ON "books_book_authors"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_book_authors_book_id_author_id_8714badb_uniq" ON "books_book_authors"("book_id", "person_id");

-- CreateIndex
CREATE INDEX "books_book_bookshelves_book_id_f820ff72" ON "books_book_bookshelves"("book_id");

-- CreateIndex
CREATE INDEX "books_book_bookshelves_bookshelf_id_80cc77c5" ON "books_book_bookshelves"("bookshelf_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_book_bookshelves_book_id_bookshelf_id_6016a70a_uniq" ON "books_book_bookshelves"("book_id", "bookshelf_id");

-- CreateIndex
CREATE INDEX "books_book_languages_book_id_e833b1f4" ON "books_book_languages"("book_id");

-- CreateIndex
CREATE INDEX "books_book_languages_language_id_e9f60572" ON "books_book_languages"("language_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_book_languages_book_id_language_id_554fdccb_uniq" ON "books_book_languages"("book_id", "language_id");

-- CreateIndex
CREATE INDEX "books_book_subjects_book_id_a578cff2" ON "books_book_subjects"("book_id");

-- CreateIndex
CREATE INDEX "books_book_subjects_subject_id_7445958f" ON "books_book_subjects"("subject_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_book_subjects_book_id_subject_id_74dcf64a_uniq" ON "books_book_subjects"("book_id", "subject_id");

-- CreateIndex
CREATE INDEX "books_book_translators_book_id_7b8cd893" ON "books_book_translators"("book_id");

-- CreateIndex
CREATE INDEX "books_book_translators_person_id_ad262373" ON "books_book_translators"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_book_translators_book_id_person_id_fd7c4b79_uniq" ON "books_book_translators"("book_id", "person_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_bookshelf_name_key" ON "books_bookshelf"("name");

-- CreateIndex
CREATE INDEX "books_bookshelf_name_2642cad6_like" ON "books_bookshelf"("name");

-- CreateIndex
CREATE INDEX "books_format_book_id_b948fa34" ON "books_format"("book_id");

-- CreateIndex
CREATE UNIQUE INDEX "books_language_code_key" ON "books_language"("code");

-- CreateIndex
CREATE INDEX "books_language_code_217c406c_like" ON "books_language"("code");

-- CreateIndex
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log"("content_type_id");

-- CreateIndex
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type"("app_label", "model");

-- CreateIndex
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session"("expire_date");

-- CreateIndex
CREATE INDEX "django_session_session_key_c0390e0f_like" ON "django_session"("session_key");

-- AddForeignKey
ALTER TABLE "auth_group_permissions" ADD CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_group_permissions" ADD CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_permission" ADD CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_groups" ADD CONSTRAINT "auth_user_groups_group_id_97559544_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "auth_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_groups" ADD CONSTRAINT "auth_user_groups_user_id_6a12ed8b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_user_permissions" ADD CONSTRAINT "auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "auth_permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auth_user_user_permissions" ADD CONSTRAINT "auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_authors" ADD CONSTRAINT "books_book_authors_book_id_ed3433e7_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "books_book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_authors" ADD CONSTRAINT "books_book_authors_person_id_feffc563_fk_books_person_id" FOREIGN KEY ("person_id") REFERENCES "books_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_bookshelves" ADD CONSTRAINT "books_book_bookshelv_bookshelf_id_80cc77c5_fk_books_boo" FOREIGN KEY ("bookshelf_id") REFERENCES "books_bookshelf"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_bookshelves" ADD CONSTRAINT "books_book_bookshelves_book_id_f820ff72_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "books_book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_languages" ADD CONSTRAINT "books_book_languages_book_id_e833b1f4_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "books_book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_languages" ADD CONSTRAINT "books_book_languages_language_id_e9f60572_fk_books_language_id" FOREIGN KEY ("language_id") REFERENCES "books_language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_subjects" ADD CONSTRAINT "books_book_subjects_book_id_a578cff2_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "books_book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_subjects" ADD CONSTRAINT "books_book_subjects_subject_id_7445958f_fk_books_subject_id" FOREIGN KEY ("subject_id") REFERENCES "books_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_translators" ADD CONSTRAINT "books_book_translators_book_id_7b8cd893_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "books_book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_book_translators" ADD CONSTRAINT "books_book_translators_person_id_ad262373_fk_books_person_id" FOREIGN KEY ("person_id") REFERENCES "books_person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "books_format" ADD CONSTRAINT "books_format_book_id_b948fa34_fk_books_book_id" FOREIGN KEY ("book_id") REFERENCES "books_book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "django_admin_log" ADD CONSTRAINT "django_admin_log_content_type_id_c4bce8eb_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "django_content_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "django_admin_log" ADD CONSTRAINT "django_admin_log_user_id_c564eba6_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
