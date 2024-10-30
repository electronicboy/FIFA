CREATE TABLE IF NOT EXISTS biz_users
(
    id    INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name  TEXT NULL,
    clerk TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS biz_locations
(
    id            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    location_name TEXT NOT NULL,
    country       TEXT NOT NULL,
    UNIQUE (location_name, country)
);

CREATE TABLE IF NOT EXISTS biz_businesses
(
    id             INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name           TEXT                           NOT NULL,
    location       TEXT                           NULL, -- full address from RAPI
    website        TEXT                           NULL,
    phone          TEXT                           NULL,
    logo           TEXT                           NULL,
    image_thumb    TEXT                           NULL,
    image_large    TEXT                           NULL,
    business_id    TEXT                           NULL, -- From rapidAPI
    longitude      FLOAT                          NULL,
    latitude       FLOAT                          NULL,
    street_address TEXT                           NULL,
    zipcode        TEXT                           NULL,
    location       INT REFERENCES biz_locations (id) NOT NULL,
    --country     TEXT NULL, -- Now inside of City, because, duh
    hours          JSON                           NULL
);

CREATE TABLE IF NOT EXISTS biz_reviews
(
    id       INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    business INT REFERENCES biz_businesses (id),
    user_id   INT  NOT NULL REFERENCES biz_users (id),
    comment  TEXT NOT NULL,
    review   INT  NOT NULL
);

CREATE TABLE IF NOT EXISTS biz_category
(
    id   INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS biz_business_category
(
    business INT NOT NULL REFERENCES biz_businesses (id),
    category INT NOT NULL REFERENCES biz_category (id),
    UNIQUE (business, category)
);
