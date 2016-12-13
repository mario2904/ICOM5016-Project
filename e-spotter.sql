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
    transaction_text character varying(400),
    ammount_charged numeric(5,2) NOT NULL,
    time_stamp timestamp without time zone NOT NULL,
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
\.


--
-- Name: account_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_account_id_seq', 1, false);


--
-- Data for Name: association_sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY association_sponsors (asp_id, association_id, sponsor_id) FROM stdin;
\.


--
-- Name: association_sponsors_asp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('association_sponsors_asp_id_seq', 1, false);


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
\.


--
-- Name: associations_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_account_id_seq', 1, false);


--
-- Name: associations_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_association_id_seq', 1, false);


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
\.


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_category_id_seq', 9, true);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events (event_id, event_name, registration_link, description, entrance_fee, start_date, end_date, end_time, start_time, time_stamp, event_location, is_live, association_id, image_id) FROM stdin;
\.


--
-- Name: events_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_association_id_seq', 1, false);


--
-- Data for Name: events_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events_categories (ec_id, event_id, category_id) FROM stdin;
\.


--
-- Name: events_categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_category_id_seq', 1, false);


--
-- Name: events_categories_ec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_ec_id_seq', 1, false);


--
-- Name: events_categories_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_event_id_seq', 1, false);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_event_id_seq', 1, false);


--
-- Name: events_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_image_id_seq', 1, false);


--
-- Data for Name: followed_associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY followed_associations (fe_id, user_id, association_id) FROM stdin;
\.


--
-- Name: followed_associations_association_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('followed_associations_association_id_seq', 1, false);


--
-- Name: followed_associations_fe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('followed_associations_fe_id_seq', 1, false);


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
\.


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('images_image_id_seq', 12, true);


--
-- Data for Name: interested; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY interested (interested_id, event_id, user_id) FROM stdin;
\.


--
-- Name: interested_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_event_id_seq', 1, false);


--
-- Name: interested_interested_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_interested_id_seq', 1, false);


--
-- Name: interested_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_user_id_seq', 1, false);


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY notifications (notification_id, notification_name, notification_text, date_sent, event_id) FROM stdin;
\.


--
-- Name: notifications_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notifications_event_id_seq', 1, false);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notifications_notification_id_seq', 1, false);


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY review (review_id, review, rating, date_created, event_id, user_id) FROM stdin;
\.


--
-- Name: review_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_event_id_seq', 1, false);


--
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_review_id_seq', 1, false);


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

SELECT pg_catalog.setval('students_user_id_seq', 1, false);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY transactions (transaction_id, transaction_text, ammount_charged, time_stamp, user_id, association_id, event_id) FROM stdin;
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

