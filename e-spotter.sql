--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.5
-- Dumped by pg_dump version 9.5.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account (
    account_id integer NOT NULL,
    email character varying(40) NOT NULL,
    password character varying(200) NOT NULL,
    receive_notifications boolean NOT NULL,
    date_created timestamp without time zone NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE account OWNER TO postgres;

--
-- Name: account_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE account_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_account_id_seq OWNER TO postgres;

--
-- Name: account_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_account_id_seq OWNED BY account.account_id;


--
-- Name: association_sponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE association_sponsors (
    asp_id integer NOT NULL,
    association_id integer NOT NULL,
    sponsor_id integer NOT NULL
);


ALTER TABLE association_sponsors OWNER TO postgres;

--
-- Name: association_sponsors_asp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE association_sponsors_asp_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE association_sponsors_asp_id_seq OWNER TO postgres;

--
-- Name: association_sponsors_asp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE association_sponsors_asp_id_seq OWNED BY association_sponsors.asp_id;


--
-- Name: association_sponsors_association_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE association_sponsors_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE association_sponsors_association_id_seq OWNER TO postgres;

--
-- Name: association_sponsors_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE association_sponsors_association_id_seq OWNED BY association_sponsors.association_id;


--
-- Name: association_sponsors_sponsor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE association_sponsors_sponsor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE association_sponsors_sponsor_id_seq OWNER TO postgres;

--
-- Name: association_sponsors_sponsor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE association_sponsors_sponsor_id_seq OWNED BY association_sponsors.sponsor_id;


--
-- Name: associations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE associations (
    association_id integer NOT NULL,
    association_name character varying(80) NOT NULL,
    page_link character varying(200) NOT NULL,
    initials character varying(10) NOT NULL,
    bio character varying(800) NOT NULL,
    association_location character varying(100) NOT NULL,
    account_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE associations OWNER TO postgres;

--
-- Name: associations_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE associations_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE associations_account_id_seq OWNER TO postgres;

--
-- Name: associations_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE associations_account_id_seq OWNED BY associations.account_id;


--
-- Name: associations_association_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE associations_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE associations_association_id_seq OWNER TO postgres;

--
-- Name: associations_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE associations_association_id_seq OWNED BY associations.association_id;


--
-- Name: associations_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE associations_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE associations_image_id_seq OWNER TO postgres;

--
-- Name: associations_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE associations_image_id_seq OWNED BY associations.image_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    category_id integer NOT NULL,
    category_name character varying(30)
);


ALTER TABLE category OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE category_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE category_category_id_seq OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE category_category_id_seq OWNED BY category.category_id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE events (
    event_id integer NOT NULL,
    event_name character varying(100) NOT NULL,
    registration_link character varying(200) NOT NULL,
    description character varying(800) NOT NULL,
    entrance_fee numeric(5,2),
    start_date date NOT NULL,
    end_date date NOT NULL,
    end_time time without time zone NOT NULL,
    start_time time without time zone NOT NULL,
    time_stamp timestamp without time zone NOT NULL,
    event_location character varying(100) NOT NULL,
    is_live boolean,
    association_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE events OWNER TO postgres;

--
-- Name: events_association_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE events_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_association_id_seq OWNER TO postgres;

--
-- Name: events_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_association_id_seq OWNED BY events.association_id;


--
-- Name: events_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE events_categories (
    ec_id integer NOT NULL,
    event_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE events_categories OWNER TO postgres;

--
-- Name: events_categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE events_categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_categories_category_id_seq OWNER TO postgres;

--
-- Name: events_categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_categories_category_id_seq OWNED BY events_categories.category_id;


--
-- Name: events_categories_ec_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE events_categories_ec_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_categories_ec_id_seq OWNER TO postgres;

--
-- Name: events_categories_ec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_categories_ec_id_seq OWNED BY events_categories.ec_id;


--
-- Name: events_categories_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE events_categories_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_categories_event_id_seq OWNER TO postgres;

--
-- Name: events_categories_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_categories_event_id_seq OWNED BY events_categories.event_id;


--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE events_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_event_id_seq OWNER TO postgres;

--
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_event_id_seq OWNED BY events.event_id;


--
-- Name: events_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE events_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_image_id_seq OWNER TO postgres;

--
-- Name: events_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_image_id_seq OWNED BY events.image_id;


--
-- Name: followed_associations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE followed_associations (
    fe_id integer NOT NULL,
    user_id integer NOT NULL,
    association_id integer NOT NULL
);


ALTER TABLE followed_associations OWNER TO postgres;

--
-- Name: followed_associations_association_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE followed_associations_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE followed_associations_association_id_seq OWNER TO postgres;

--
-- Name: followed_associations_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE followed_associations_association_id_seq OWNED BY followed_associations.association_id;


--
-- Name: followed_associations_fe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE followed_associations_fe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE followed_associations_fe_id_seq OWNER TO postgres;

--
-- Name: followed_associations_fe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE followed_associations_fe_id_seq OWNED BY followed_associations.fe_id;


--
-- Name: followed_associations_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE followed_associations_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE followed_associations_user_id_seq OWNER TO postgres;

--
-- Name: followed_associations_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE followed_associations_user_id_seq OWNED BY followed_associations.user_id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE images (
    image_id integer NOT NULL,
    image_path character varying(200) NOT NULL,
    image_name character varying(200)
);


ALTER TABLE images OWNER TO postgres;

--
-- Name: images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE images_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE images_image_id_seq OWNER TO postgres;

--
-- Name: images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE images_image_id_seq OWNED BY images.image_id;


--
-- Name: interested; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE interested (
    interested_id integer NOT NULL,
    event_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE interested OWNER TO postgres;

--
-- Name: interested_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE interested_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE interested_event_id_seq OWNER TO postgres;

--
-- Name: interested_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE interested_event_id_seq OWNED BY interested.event_id;


--
-- Name: interested_interested_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE interested_interested_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE interested_interested_id_seq OWNER TO postgres;

--
-- Name: interested_interested_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE interested_interested_id_seq OWNED BY interested.interested_id;


--
-- Name: interested_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE interested_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE interested_user_id_seq OWNER TO postgres;

--
-- Name: interested_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE interested_user_id_seq OWNED BY interested.user_id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE notifications (
    notification_id integer NOT NULL,
    notification_name character varying(100),
    notification_text character varying(600),
    date_sent timestamp without time zone NOT NULL,
    event_id integer NOT NULL
);


ALTER TABLE notifications OWNER TO postgres;

--
-- Name: notifications_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE notifications_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notifications_event_id_seq OWNER TO postgres;

--
-- Name: notifications_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notifications_event_id_seq OWNED BY notifications.event_id;


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE notifications_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notifications_notification_id_seq OWNER TO postgres;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notifications_notification_id_seq OWNED BY notifications.notification_id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE review (
    review_id integer NOT NULL,
    review character varying(300),
    rating integer NOT NULL,
    date_created date NOT NULL,
    event_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE review OWNER TO postgres;

--
-- Name: review_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE review_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE review_event_id_seq OWNER TO postgres;

--
-- Name: review_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE review_event_id_seq OWNED BY review.event_id;


--
-- Name: review_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE review_review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE review_review_id_seq OWNER TO postgres;

--
-- Name: review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE review_review_id_seq OWNED BY review.review_id;


--
-- Name: review_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE review_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE review_user_id_seq OWNER TO postgres;

--
-- Name: review_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE review_user_id_seq OWNED BY review.user_id;


--
-- Name: sponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sponsors (
    sponsor_id integer NOT NULL,
    sponsor_name character varying(50),
    page_link character varying(200),
    image_id integer NOT NULL
);


ALTER TABLE sponsors OWNER TO postgres;

--
-- Name: sponsors_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sponsors_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sponsors_image_id_seq OWNER TO postgres;

--
-- Name: sponsors_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sponsors_image_id_seq OWNED BY sponsors.image_id;


--
-- Name: sponsors_sponsor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sponsors_sponsor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sponsors_sponsor_id_seq OWNER TO postgres;

--
-- Name: sponsors_sponsor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sponsors_sponsor_id_seq OWNED BY sponsors.sponsor_id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE students (
    user_id integer NOT NULL,
    first_name character varying(40) NOT NULL,
    last_name character varying(40) NOT NULL,
    hometown character varying(40) NOT NULL,
    college character varying(60) NOT NULL,
    major character varying(40) NOT NULL,
    gender character varying(10) NOT NULL,
    bio character varying(800) NOT NULL,
    birthdate date NOT NULL,
    account_id integer NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE students OWNER TO postgres;

--
-- Name: students_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE students_account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE students_account_id_seq OWNER TO postgres;

--
-- Name: students_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE students_account_id_seq OWNED BY students.account_id;


--
-- Name: students_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE students_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE students_image_id_seq OWNER TO postgres;

--
-- Name: students_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE students_image_id_seq OWNED BY students.image_id;


--
-- Name: students_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE students_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE students_user_id_seq OWNER TO postgres;

--
-- Name: students_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE students_user_id_seq OWNED BY students.user_id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE transactions (
    transaction_id integer NOT NULL,
    transaction_text character varying(200),
    ammount character varying(10),
    credit_card_num character varying(250),
    expiration_date character varying(10),
    security_code character varying(5),
    first_name character varying(40),
    last_name character varying(40),
    address_line_1 character varying(150),
    address_line_2 character varying(150),
    city character varying(50),
    state character varying(30),
    post_code character varying(20),
    country character varying(50),
    time_stamp timestamp without time zone,
    user_id integer NOT NULL,
    association_id integer NOT NULL,
    event_id integer NOT NULL
);


ALTER TABLE transactions OWNER TO postgres;

--
-- Name: transactions_association_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE transactions_association_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transactions_association_id_seq OWNER TO postgres;

--
-- Name: transactions_association_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transactions_association_id_seq OWNED BY transactions.association_id;


--
-- Name: transactions_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE transactions_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transactions_event_id_seq OWNER TO postgres;

--
-- Name: transactions_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transactions_event_id_seq OWNED BY transactions.event_id;


--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE transactions_transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transactions_transaction_id_seq OWNER TO postgres;

--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transactions_transaction_id_seq OWNED BY transactions.transaction_id;


--
-- Name: transactions_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE transactions_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE transactions_user_id_seq OWNER TO postgres;

--
-- Name: transactions_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transactions_user_id_seq OWNED BY transactions.user_id;


--
-- Name: account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account ALTER COLUMN account_id SET DEFAULT nextval('account_account_id_seq'::regclass);


--
-- Name: asp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors ALTER COLUMN asp_id SET DEFAULT nextval('association_sponsors_asp_id_seq'::regclass);


--
-- Name: association_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors ALTER COLUMN association_id SET DEFAULT nextval('association_sponsors_association_id_seq'::regclass);


--
-- Name: sponsor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors ALTER COLUMN sponsor_id SET DEFAULT nextval('association_sponsors_sponsor_id_seq'::regclass);


--
-- Name: association_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations ALTER COLUMN association_id SET DEFAULT nextval('associations_association_id_seq'::regclass);


--
-- Name: account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations ALTER COLUMN account_id SET DEFAULT nextval('associations_account_id_seq'::regclass);


--
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations ALTER COLUMN image_id SET DEFAULT nextval('associations_image_id_seq'::regclass);


--
-- Name: category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN category_id SET DEFAULT nextval('category_category_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events ALTER COLUMN event_id SET DEFAULT nextval('events_event_id_seq'::regclass);


--
-- Name: association_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events ALTER COLUMN association_id SET DEFAULT nextval('events_association_id_seq'::regclass);


--
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events ALTER COLUMN image_id SET DEFAULT nextval('events_image_id_seq'::regclass);


--
-- Name: ec_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories ALTER COLUMN ec_id SET DEFAULT nextval('events_categories_ec_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories ALTER COLUMN event_id SET DEFAULT nextval('events_categories_event_id_seq'::regclass);


--
-- Name: category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories ALTER COLUMN category_id SET DEFAULT nextval('events_categories_category_id_seq'::regclass);


--
-- Name: fe_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations ALTER COLUMN fe_id SET DEFAULT nextval('followed_associations_fe_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations ALTER COLUMN user_id SET DEFAULT nextval('followed_associations_user_id_seq'::regclass);


--
-- Name: association_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations ALTER COLUMN association_id SET DEFAULT nextval('followed_associations_association_id_seq'::regclass);


--
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images ALTER COLUMN image_id SET DEFAULT nextval('images_image_id_seq'::regclass);


--
-- Name: interested_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested ALTER COLUMN interested_id SET DEFAULT nextval('interested_interested_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested ALTER COLUMN event_id SET DEFAULT nextval('interested_event_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested ALTER COLUMN user_id SET DEFAULT nextval('interested_user_id_seq'::regclass);


--
-- Name: notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications ALTER COLUMN notification_id SET DEFAULT nextval('notifications_notification_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications ALTER COLUMN event_id SET DEFAULT nextval('notifications_event_id_seq'::regclass);


--
-- Name: review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review ALTER COLUMN review_id SET DEFAULT nextval('review_review_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review ALTER COLUMN event_id SET DEFAULT nextval('review_event_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review ALTER COLUMN user_id SET DEFAULT nextval('review_user_id_seq'::regclass);


--
-- Name: sponsor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors ALTER COLUMN sponsor_id SET DEFAULT nextval('sponsors_sponsor_id_seq'::regclass);


--
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors ALTER COLUMN image_id SET DEFAULT nextval('sponsors_image_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students ALTER COLUMN user_id SET DEFAULT nextval('students_user_id_seq'::regclass);


--
-- Name: account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students ALTER COLUMN account_id SET DEFAULT nextval('students_account_id_seq'::regclass);


--
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students ALTER COLUMN image_id SET DEFAULT nextval('students_image_id_seq'::regclass);


--
-- Name: transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN transaction_id SET DEFAULT nextval('transactions_transaction_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN user_id SET DEFAULT nextval('transactions_user_id_seq'::regclass);


--
-- Name: association_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN association_id SET DEFAULT nextval('transactions_association_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN event_id SET DEFAULT nextval('transactions_event_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account (account_id, email, password, receive_notifications, date_created, active) FROM stdin;
1	john.doe@gmail.com	password	f	2016-12-13 12:44:33.819392	t
2	jane.doe@gmail.com	password	f	2016-12-13 13:00:39.62257	t
3	kevin.hart@gmail.com	password	f	2016-12-13 13:05:58.168348	t
4	dwayne.johnson@gmail.com	password	f	2016-12-13 13:08:44.589975	t
5	shpe@upr.edu	password	f	2016-12-13 13:13:53.826535	t
6	idea.platform@upr.edu	password	f	2016-12-13 13:33:14.035507	t
7	ieeecas@upr.edu	password	f	2016-12-13 13:46:03.096211	t
8	ieeewie@upr.edu	password	f	2016-12-13 13:52:42.876005	t
9	hackpr@upr.edu	password	f	2016-12-13 14:00:56.705486	t
10	mario.orbegoso@gmail.com	password	f	2016-12-13 14:06:40.727951	t
\.


--
-- Name: account_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_account_id_seq', 10, true);


--
-- Data for Name: association_sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY association_sponsors (asp_id, association_id, sponsor_id) FROM stdin;
1	1	2
2	1	3
3	1	4
4	1	5
5	1	8
6	1	9
7	1	10
8	2	1
9	2	3
10	2	4
11	2	8
12	2	9
13	3	1
14	3	4
15	3	6
16	3	8
17	3	9
18	3	10
19	4	1
20	4	3
21	4	4
22	4	6
23	4	8
24	4	9
25	4	10
26	5	1
27	5	6
28	5	8
\.


--
-- Name: association_sponsors_asp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('association_sponsors_asp_id_seq', 28, true);


--
-- Name: association_sponsors_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('association_sponsors_association_id_seq', 1, false);


--
-- Name: association_sponsors_sponsor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('association_sponsors_sponsor_id_seq', 1, false);


--
-- Data for Name: associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY associations (association_id, association_name, page_link, initials, bio, association_location, account_id, image_id) FROM stdin;
1	Society of Hispanic Professional Engineers	http://shpeuprm.tumblr.com/	SHPE	The Society of Hispanic Professional Engineers (SHPE) is the primary venue for students to become successful professionals and it provides valuable development opportunities. It is a pipeline connecting High Schools, undergraduates and professionals.	Department of Electrical and Computer Engineering, University of Puerto Rico, Mayagüez	5	18
2	Idea Platform	http://ideaplatform.org/	IP	Jóvenes visionarios enfocados en crear un nuevo Puerto Rico mediante el emprendimiento y la innovación.	Centro de Estudiantes, 1er piso	6	23
3	IEEE Circuits and Systems Society UPRM	http://cas.uprm.edu/	CAS	The IEEE Circuits and Systems Society is the leading organization that promotes the advancement of the theory, analysis, design, tools, and implementation of circuits and systems. The field spans their theoretical foundations, applications, and architectures, as well as circuits and systems implementation of algorithms for signal and information processing.\r\n\r\nThe Society brings engineers, researchers, scientists and others involved in circuits and systems applications access to the industry's most essential technical information, networking opportunities, career development tools and many other exclusive benefits.\r\n\r\nThe student chapter in Mayagüez proudly welcomes new members into exploring and experimenting in different technical applications and designs.	Salon IEEE	7	26
4	IEEE Women in Engineering UPRM	http://wie.uprm.edu/	IEEE WIE	The Women in Engineering Affinity Group (WIE) is the largest international professional organization dedicated to promoting women engineers and scientists. Our student chapter was founded in September 2005 by an interdisciplinary group of students that wanted to get more women interested in studying engineering at the UPRM. Our goal is to encourage the growth of women pursuing degrees in engineering fields where they are strongly underrepresented. As a student organization, we support students who have already chosen an engineering career to continue on their path by offering workshops and orientations, which will help them grow academically and professionally. \r\nCome join us!	IEEE Room	8	29
5	HackPR - UPRM Chapter	https://www.facebook.com/HackPRUPRM/	HackUPRM	HackPR is a non-profit organization which is run by students. It originated in December of 2012 and it began with isolated hackathons that have now evolved into a more structured organization, with the purpose of expanding the hacker community in Puerto Rico.\r\n\r\nNow, the organization is divided by chapters. We are the University of Puerto Rico at Mayaguez chapter.	Celis 111	9	30
\.


--
-- Name: associations_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_account_id_seq', 1, false);


--
-- Name: associations_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_association_id_seq', 5, true);


--
-- Name: associations_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_image_id_seq', 1, false);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY category (category_id, category_name) FROM stdin;
1	Food
2	Fundraiser
3	Arts
4	Social
5	Educational
6	Sports
7	Competition
8	Music
9	Other
10	Business
\.


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_category_id_seq', 10, true);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events (event_id, event_name, registration_link, description, entrance_fee, start_date, end_date, end_time, start_time, time_stamp, event_location, is_live, association_id, image_id) FROM stdin;
1	All Nighter Study Session		Ya se acercan los finales y todos necesitamos repasar, ¿No encuentran un lugar donde estudiar después de las 12am?\r\nSHPE los invita a su primer All-nighter study session! Tendrán a su disponibilidad áreas de estudio grupal, individual y de descanso. \r\n¡Se ofrecerá café gratis durante toda la noche junto a meriendas para satisfacer los midnight munchies!	\N	2016-12-12	2016-12-12	22:00:00	19:00:00	2016-12-13 13:17:14.240981	S-204, S-205, S-206	t	1	19
3	SHPE - Induction Ceremony	https://docs.google.com/forms/d/e/1FAIpQLSd6HsKpsi62JPoz7RIHwcAvrflMxnHiRNBVhWBk7WgSAWHiLA/closedform	We are going back in time!\r\n\r\nSHPE-UPRM invites you to our Induction Ceremony.\r\n\r\nParty the night away through the different music eras. Come dressed in fashion from your favorite decade from the 50's to the 90's. If today style is your favorite you are also invited to dress as you!	\N	2016-12-08	2016-12-08	12:00:00	19:30:00	2016-12-13 13:23:42.360093	Casa Grande CIAPR, Mayaguez	t	1	21
2	Movie Night	https://www.youtube.com/watch?v=dQw4w9WgXcQ	SHPE los invita a acompañarnos a ver Guardians of the Galaxy el lunes 5 de diciembre en la Cueva de Tarzán. No tienes que ser miembro para asistir, todos están invitados para compartir con nosotros y aprender sobre SHPE. \r\n\r\nTienen interés en entrar a SHPE?\r\nAprovechen de esta actividad, traigan sus amigos y pueden disfrutar de un descuento de 2 por 1 en membresía. Como miembros pueden disfrutar de muchas más actividades como esta incluyendo la iniciación esta misma semana.\r\n¡Habrán premios y sorpresas!	\N	2016-12-05	2016-12-05	22:00:00	19:00:00	2016-12-13 13:19:34.850852	Cueva de Tarzán	t	1	20
4	Introduction to Project Management	https://www.youtube.com/watch?v=dQw4w9WgXcQ	¿Quieres desarrollar tus Project Management skills?\r\nEste próximo 15 de noviembre el Prof. Miguel Seguí estará ofreciendo un taller de ‘Introduction to Project Management’ en II-204.\r\nHabrá un Case Study al final, al igual que Pizza Gratis.\r\n¡Te esperamos!	\N	2016-11-15	2016-11-15	17:00:00	15:00:00	2016-12-13 13:29:22.983878	II-204	t	1	22
5	#Yo No me Quito		Ven y conoce como nacio la fundacion, las historias de personas que perseveraron ante la adversidad y mucho mas!\r\nTendremos la visita especial de su fundador, el Sr. Carlos Lopez Lay	\N	2016-11-22	2016-11-22	12:00:00	10:00:00	2016-12-13 13:38:58.396806	ADEM 242	t	2	24
6	Be A Maker Girl	https://goo.gl/hvmXQv	¡Para tí chica Colegial, que te apasiona construir y programar! No te pierdas esta oportunidad única en el Colegio, este jueves a la hora Universal en Starting Point.\r\n¡Te esperamos!	\N	2016-11-17	2016-11-17	12:00:00	10:30:00	2016-12-13 13:42:39.392879	Starting Point (Frente a la Cueva Tarzan)	t	2	25
7	PSPICE Workshop		Queremos notificarles que el martes 1 de noviembre tendremos el taller de PSpice en INCADEL (S-105C). Esta es una gran herramienta de simulación de circuitos. La misma se utiliza en diferentes cursos e investigaciones además de añadir gran valor a su desarrollo profesional. No dude en compartir la promoción con sus compañeros. Favor de mantenerse al día con notificaciones a su correo electrónico o facebook en caso de que haya algún cambio. Aprovechen esta oportunidad, los esperamos!	\N	2016-11-01	2016-11-01	12:00:00	10:30:00	2016-12-13 13:49:04.231678	INCADEL (S-105C)	t	3	27
8	CASA ABIERTA DEL LABORATORIO DE AUTOMATIZACIÓN	 https://goo.gl/forms/voXXXW8xu53ppC6F2	Estudiantes del curso ININ 4057 tendrán sus proyectos en exhibición.\r\nü Lugar y horario: Edificio de Ingeniería Industrial, Salón II-117; 2:00 PM – 8:00 PM \r\n\r\nTenemos videos de proyectos pasados disponibles en Youtube: RealTimePC.ININ.UPRM\r\n\r\nDudas o preguntas se pueden enviar al e-mail: RealTimePC.ININ@gmail.com\r\nSíguenos en nuestra página de Facebook: RealTimePC ININ UPRM\r\nInteractúa con nosotros en el grupo de Facebook: RealTimePC.ININ.UPRM	\N	2016-12-02	2016-12-02	20:00:00	14:00:00	2016-12-13 13:56:04.489438	Edificio de Ingeniería Industrial, Salón II-117	t	4	28
9	Local HACK Day		¡Saludos Hackers! Ya esta la fecha para el proximo Local Hack Day de MLH en la UPRM. Será en el salón Tarzán, Centro de Estudiantes, de 9AM-9PM el próximo 3 de diciembre. Para registrarse entren a localhackday.mlh.io	\N	2016-12-03	2016-12-03	21:00:00	09:00:00	2016-12-13 14:03:32.27879	Salon Tarzan	t	5	31
\.


--
-- Name: events_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_association_id_seq', 1, false);


--
-- Data for Name: events_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events_categories (ec_id, event_id, category_id) FROM stdin;
1	1	1
2	1	2
3	1	4
4	1	9
14	3	1
15	3	3
16	3	4
17	3	5
18	3	10
19	3	9
20	2	1
21	2	2
22	2	4
23	4	1
24	4	5
25	4	10
26	4	9
27	5	1
28	5	4
29	5	5
30	5	10
31	5	9
32	6	1
33	6	5
34	6	10
35	6	7
36	6	9
37	7	1
38	7	4
39	7	5
40	7	7
41	7	9
42	8	1
43	8	4
44	8	5
45	9	1
46	9	5
47	9	7
48	9	9
\.


--
-- Name: events_categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_category_id_seq', 1, false);


--
-- Name: events_categories_ec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_ec_id_seq', 48, true);


--
-- Name: events_categories_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_event_id_seq', 1, false);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_event_id_seq', 9, true);


--
-- Name: events_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_image_id_seq', 1, false);


--
-- Data for Name: followed_associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY followed_associations (fe_id, user_id, association_id) FROM stdin;
1	5	2
2	5	5
3	5	4
4	3	5
5	3	4
6	3	2
7	2	2
8	2	4
9	2	1
10	2	3
11	4	1
12	4	2
13	4	4
14	1	1
15	1	5
16	1	4
17	1	2
18	1	3
\.


--
-- Name: followed_associations_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('followed_associations_association_id_seq', 1, false);


--
-- Name: followed_associations_fe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('followed_associations_fe_id_seq', 18, true);


--
-- Name: followed_associations_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('followed_associations_user_id_seq', 1, false);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY images (image_id, image_path, image_name) FROM stdin;
1	/images/defaults/default_profile.jpg	Default Profile
2	/images/defaults/deleted_profile.jpg	Deleted Profile
3	https://cdn0.vox-cdn.com/thumbor/zL414AMfclnMcwL59xa3ZTXrcDw=/3x0:1418x796/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/47080648/Screen_Shot_2015-09-02_at_2.20.55_pm.0.0.png	Verizon Logo
4	https://static1.squarespace.com/static/53752262e4b0acdd68de7377/t/53869050e4b0149a746ccec3/1401327703838/Harris+Logo.png	Harris Logo
5	https://developer.spotify.com/wp-content/uploads/2014/06/spotify-design.png	Spotify Logo
6	http://troutlakewashington.com/wp-content/uploads/ChevronLogo.png	Chevron Logo
7	http://www.ieyenews.com/wordpress/wp-content/uploads/2016/08/exxon-mobil.jpg	Exxon Mobile Logo
8	http://1.bp.blogspot.com/-kLHu6zQLfMw/TdQxwBU2jfI/AAAAAAAAUB4/ZSbrhaHqmGA/s1600/boeing_Logo_10.jpg	Boeing Logo
9	http://www.pngpix.com/wp-content/uploads/2016/07/PNGPIX-COM-Lockheed-Martin-Logo-PNG-Transparent-2.png	Lockheed Logo
10	http://www.uprm.edu/wdt/resources/portico1.gif	UPRM Logo
11	http://cdn-0.famouslogos.us/images/general-electric-logo.jpg	General Electric Logo
12	https://upload.wikimedia.org/wikipedia/en/b/b6/GM,_logo.png	GM Logo
13	https://res.cloudinary.com/e-spotter/image/upload/v1481633916/s4jwlzl55mgbajymbmuk.jpg	\N
14	https://res.cloudinary.com/e-spotter/image/upload/v1481633963/iyiqxhqsm6cgeftmx6wy.jpg	\N
15	https://res.cloudinary.com/e-spotter/image/upload/v1481634213/ekttsruvjhy9kcxkzpmp.png	\N
16	https://res.cloudinary.com/e-spotter/image/upload/v1481634397/g6kxde5wh2ctacsgutmz.jpg	\N
17	https://res.cloudinary.com/e-spotter/image/upload/v1481634573/m0pknxzgnulttfimkur6.jpg	\N
18	https://res.cloudinary.com/e-spotter/image/upload/v1481634878/xgnnpsa5ckniv3skwjdr.jpg	\N
19	https://res.cloudinary.com/e-spotter/image/upload/v1481635034/nanmeznqtnbzg3le7cbg.jpg	\N
20	https://res.cloudinary.com/e-spotter/image/upload/v1481635174/ozbqmcqjnf51t9wk2jqs.jpg	\N
21	https://res.cloudinary.com/e-spotter/image/upload/v1481635422/vd5lu7id6yto2lzqu2nc.jpg	\N
22	https://res.cloudinary.com/e-spotter/image/upload/v1481635762/r8yyax5hithjhmbpgy6w.jpg	\N
23	https://res.cloudinary.com/e-spotter/image/upload/v1481636062/zwyg6uvtfph4ei7rcgi3.png	\N
24	https://res.cloudinary.com/e-spotter/image/upload/v1481636338/nrbxv7wchyyepi8ovtye.jpg	\N
25	https://res.cloudinary.com/e-spotter/image/upload/v1481636558/tzelivcknr51bualm4ty.jpg	\N
26	https://res.cloudinary.com/e-spotter/image/upload/v1481636806/g96rtm7lsqy4lo7pz2vt.jpg	\N
27	https://res.cloudinary.com/e-spotter/image/upload/v1481636943/gfnpi0tmdwjdg2uhh3tm.jpg	\N
28	https://res.cloudinary.com/e-spotter/image/upload/v1481637363/y2qovofmljehoyo1j17y.jpg	\N
29	https://res.cloudinary.com/e-spotter/image/upload/v1481637457/f9gwcuvwkyx7lm8jxok8.png	\N
30	https://res.cloudinary.com/e-spotter/image/upload/v1481637704/sw83zbbzidmh3svpaby8.jpg	\N
31	https://res.cloudinary.com/e-spotter/image/upload/v1481637811/mln0jbldhmvlogn6ekfa.jpg	\N
32	https://res.cloudinary.com/e-spotter/image/upload/v1481638091/h3an6sss0ouoaf5ejq6u.jpg	\N
\.


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('images_image_id_seq', 32, true);


--
-- Data for Name: interested; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY interested (interested_id, event_id, user_id) FROM stdin;
1	5	5
2	7	5
3	2	5
4	1	4
5	4	4
6	2	3
7	7	3
8	8	2
9	1	2
10	9	2
11	4	5
12	5	3
13	6	3
14	5	4
15	6	4
16	8	4
17	6	1
18	8	1
19	5	1
20	7	1
\.


--
-- Name: interested_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_event_id_seq', 1, false);


--
-- Name: interested_interested_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_interested_id_seq', 20, true);


--
-- Name: interested_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_user_id_seq', 1, false);


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY notifications (notification_id, notification_name, notification_text, date_sent, event_id) FROM stdin;
1	Relocation...	There had to be some changes due to the wether.	2016-12-13 14:27:57.066169	4
2	We're almost readyy!!!	Get Pumped up! Invite more friends.	2016-12-13 14:28:49.841191	3
3	Bonus Movie!!!	We're going to be streaming another moviee at the end for those who still wanna stay!!!\nThe Title of the movie is a surprise!	2016-12-13 14:30:08.37317	2
4	Come on PEOPLE	This is a serious matter. \nInvite all your friends!	2016-12-13 14:31:26.784137	5
5	This is a one in  a time opportunity	We are going to give out a free raspberry pi 3 to the person that brings 10 or more people to the event!	2016-12-13 14:32:49.547603	6
\.


--
-- Name: notifications_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notifications_event_id_seq', 1, false);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notifications_notification_id_seq', 5, true);


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY review (review_id, review, rating, date_created, event_id, user_id) FROM stdin;
1	AT LASTTTT.\nIt was cool	5	2016-12-13	7	5
2	Love that movie!	4	2016-12-13	2	5
3	MAN I wanted a role in that movie!\nSAD!	2	2016-12-13	2	4
4	I REALLY Need those munchies!!!	1	2016-12-13	1	4
5	I could learn a thing or two	5	2016-12-13	4	4
6	That moveee Was Hilarious! LOLOLOL	5	2016-12-13	2	3
7	YOU Gonna Learn Today!!!	3	2016-12-13	7	3
8	Seems Cool	4	2016-12-13	8	2
9	Let's get our Jiggy on!	5	2016-12-13	3	2
10	Need to ACE those finals! notime to coook.\nGreat EVENT!!	5	2016-12-13	1	2
11	mmm... Let's seee. I'm kind of a nooob	3	2016-12-13	9	2
12	Let's see what's this all about thenn.. Not much high expectations	3	2016-12-13	5	3
13	Hope there will be many hot chicks.	5	2016-12-13	6	3
14	This is a big important matter. Props to all of y'all. Keep it up!	1	2016-12-13	5	4
15	Come on Kevin. That's not funny!	5	2016-12-13	6	4
16	I'm really pumped up for the event!	5	2016-12-13	8	1
17	Definitely goin!	5	2016-12-13	5	1
\.


--
-- Name: review_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_event_id_seq', 1, false);


--
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_review_id_seq', 17, true);


--
-- Name: review_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_user_id_seq', 1, false);


--
-- Data for Name: sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sponsors (sponsor_id, sponsor_name, page_link, image_id) FROM stdin;
1	Verizon	http://www.verizon.com	3
2	Spotify	https://www.spotify.com/us/	5
3	Chevron	https://www.chevron.com/	6
4	Exxon Mobile	http://corporate.exxonmobil.com/	7
5	Boeing	http://www.boeing.com/	8
6	Harris	https://www.harris.com/	4
7	Lockheed Martin	http://www.lockheedmartin.com/	9
8	UPRM	http://www.uprm.edu/	10
9	General Electric	http://www.ge.com/	11
10	General Motors	http://www.gm.com/	12
\.


--
-- Name: sponsors_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sponsors_image_id_seq', 3, true);


--
-- Name: sponsors_sponsor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sponsors_sponsor_id_seq', 10, true);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY students (user_id, first_name, last_name, hometown, college, major, gender, bio, birthdate, account_id, image_id) FROM stdin;
1	John	Doe	Barceloneta	University of Puerto Rico, Carolina	ICOM	Male	Hi I'm John Doe	0006-06-11	1	14
2	Jane	Doe	Aguas Buenas	University of Puerto Rico, Aguadilla	INCI	Female	HEEEY I'm Jane.	0006-06-17	2	15
3	Kevin	Hart	Guayanilla	University of Puerto Rico, Ponce	ININ	Male	You gone learn today!!!	0009-10-06	3	16
4	Dwayne	Johnson	Gurabo	University of Puerto Rico, Mayaguez	INME	Male	Can You Smell What the ROCK is Cooking????	0006-06-08	4	17
5	Mario	Orbegoso	Trujillo Alto	University of Puerto Rico, Mayaguez	ICOM	Male	SUP'\r\nIt's a Me MARIOO!	0006-06-19	10	32
\.


--
-- Name: students_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('students_account_id_seq', 1, false);


--
-- Name: students_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('students_image_id_seq', 1, false);


--
-- Name: students_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('students_user_id_seq', 5, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY transactions (transaction_id, transaction_text, ammount, credit_card_num, expiration_date, security_code, first_name, last_name, address_line_1, address_line_2, city, state, post_code, country, time_stamp, user_id, association_id, event_id) FROM stdin;
\.


--
-- Name: transactions_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_association_id_seq', 1, false);


--
-- Name: transactions_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_event_id_seq', 1, false);


--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_transaction_id_seq', 1, false);


--
-- Name: transactions_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_user_id_seq', 1, false);


--
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- Name: association_sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors
    ADD CONSTRAINT association_sponsors_pkey PRIMARY KEY (asp_id);


--
-- Name: associations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_pkey PRIMARY KEY (association_id);


--
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: events_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories
    ADD CONSTRAINT events_categories_pkey PRIMARY KEY (ec_id);


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: followed_associations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations
    ADD CONSTRAINT followed_associations_pkey PRIMARY KEY (fe_id);


--
-- Name: images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: interested_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_pkey PRIMARY KEY (interested_id);


--
-- Name: notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- Name: review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);


--
-- Name: sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors
    ADD CONSTRAINT sponsors_pkey PRIMARY KEY (sponsor_id);


--
-- Name: students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (user_id);


--
-- Name: transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- Name: association_sponsors_association_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors
    ADD CONSTRAINT association_sponsors_association_id_fkey FOREIGN KEY (association_id) REFERENCES associations(association_id);


--
-- Name: association_sponsors_sponsor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors
    ADD CONSTRAINT association_sponsors_sponsor_id_fkey FOREIGN KEY (sponsor_id) REFERENCES sponsors(sponsor_id);


--
-- Name: associations_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- Name: associations_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- Name: events_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories
    ADD CONSTRAINT events_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES category(category_id);


--
-- Name: events_categories_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories
    ADD CONSTRAINT events_categories_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- Name: events_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- Name: followed_associations_association_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations
    ADD CONSTRAINT followed_associations_association_id_fkey FOREIGN KEY (association_id) REFERENCES associations(association_id);


--
-- Name: followed_associations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations
    ADD CONSTRAINT followed_associations_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- Name: interested_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- Name: interested_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- Name: notifications_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- Name: review_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- Name: review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- Name: sponsors_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors
    ADD CONSTRAINT sponsors_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- Name: students_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- Name: students_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- Name: transactions_association_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_association_id_fkey FOREIGN KEY (association_id) REFERENCES associations(association_id);


--
-- Name: transactions_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- Name: transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

