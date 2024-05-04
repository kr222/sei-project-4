CREATE TABLE
  public.users (
    id character varying(255) NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(255) NOT NULL,
    pw_hash character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    first_name character varying(255) NULL,
    last_name character varying(255) NULL
  );

ALTER TABLE
  public.users
ADD
  CONSTRAINT users_pkey PRIMARY KEY (id)

  CREATE TABLE
  public.workshops (
    id character varying(255) NOT NULL DEFAULT nextval('workshop_id_seq'::regclass),
    workshop_type character varying(255) NOT NULL,
    booking_date date NULL,
    booking_cost integer NULL
  );

ALTER TABLE
  public.workshops
ADD
  CONSTRAINT workshop_pkey PRIMARY KEY (id)

  CREATE TABLE
  public.workshops (
    id character varying(255) NOT NULL DEFAULT nextval('workshop_id_seq'::regclass),
    workshop_type character varying(255) NOT NULL,
    booking_date date NULL,
    booking_cost integer NULL
  );

ALTER TABLE
  public.workshops
ADD
  CONSTRAINT workshop_pkey PRIMARY KEY (id)