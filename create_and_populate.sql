--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.10
-- Dumped by pg_dump version 9.5.4

-- Started on 2016-11-16 20:38:27 AST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2181 (class 1262 OID 12141)
-- Dependencies: 2180
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 2 (class 3079 OID 11861)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2184 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 1 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 2185 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 175 (class 1259 OID 16395)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE account (
    account_id integer NOT NULL,
    email character varying(35) NOT NULL,
    password character varying(20) NOT NULL,
    date_created character varying(30) NOT NULL,
    receive_notifications character varying(5)
);


ALTER TABLE account OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 16393)
-- Name: account_accountid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE account_accountid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE account_accountid_seq OWNER TO postgres;

--
-- TOC entry 2186 (class 0 OID 0)
-- Dependencies: 174
-- Name: account_accountid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_accountid_seq OWNED BY account.account_id;


--
-- TOC entry 203 (class 1259 OID 16624)
-- Name: association_sponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE association_sponsors (
    asp_id integer NOT NULL,
    association_id bigint,
    sponsor_id bigint
);


ALTER TABLE association_sponsors OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16622)
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
-- TOC entry 2187 (class 0 OID 0)
-- Dependencies: 202
-- Name: association_sponsors_asp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE association_sponsors_asp_id_seq OWNED BY association_sponsors.asp_id;


--
-- TOC entry 177 (class 1259 OID 16403)
-- Name: associations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE associations (
    association_id integer NOT NULL,
    association_name character varying(60) NOT NULL,
    page_link character varying(30) NOT NULL,
    initials character varying(10) NOT NULL,
    bio character varying(400),
    account_id bigint NOT NULL,
    location_id bigint NOT NULL,
    image_id bigint NOT NULL
);


ALTER TABLE associations OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 16401)
-- Name: associations_associationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE associations_associationid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE associations_associationid_seq OWNER TO postgres;

--
-- TOC entry 2188 (class 0 OID 0)
-- Dependencies: 176
-- Name: associations_associationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE associations_associationid_seq OWNED BY associations.association_id;


--
-- TOC entry 196 (class 1259 OID 16551)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    category_id integer NOT NULL,
    category_name character varying(20)
);


ALTER TABLE category OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 16549)
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
-- TOC entry 2189 (class 0 OID 0)
-- Dependencies: 195
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE category_category_id_seq OWNED BY category.category_id;


--
-- TOC entry 183 (class 1259 OID 16438)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE events (
    event_id integer NOT NULL,
    association_id bigint,
    event_name character varying(100) NOT NULL,
    is_live character varying(3) NOT NULL,
    category character varying(15),
    entrance_fee character varying(10),
    location_id bigint,
    registration_link character varying(200),
    description character varying(500),
    image_id bigint,
    start_date character varying(20),
    end_date character varying(20),
    end_time character varying(20),
    start_time character varying(20),
    time_stamp timestamp without time zone
);


ALTER TABLE events OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16583)
-- Name: events_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE events_categories (
    ec_id integer NOT NULL,
    event_id bigint,
    category_id bigint
);


ALTER TABLE events_categories OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16581)
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
-- TOC entry 2190 (class 0 OID 0)
-- Dependencies: 198
-- Name: events_categories_ec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_categories_ec_id_seq OWNED BY events_categories.ec_id;


--
-- TOC entry 182 (class 1259 OID 16436)
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
-- TOC entry 2191 (class 0 OID 0)
-- Dependencies: 182
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_event_id_seq OWNED BY events.event_id;


--
-- TOC entry 201 (class 1259 OID 16601)
-- Name: followed_associations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE followed_associations (
    fe_id integer NOT NULL,
    association_id bigint,
    user_id bigint
);


ALTER TABLE followed_associations OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16599)
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
-- TOC entry 2192 (class 0 OID 0)
-- Dependencies: 200
-- Name: followed_associations_fe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE followed_associations_fe_id_seq OWNED BY followed_associations.fe_id;


--
-- TOC entry 191 (class 1259 OID 16485)
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE images (
    image_id integer NOT NULL,
    image_name character varying(25),
    image_path character varying(200)
);


ALTER TABLE images OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 16483)
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
-- TOC entry 2193 (class 0 OID 0)
-- Dependencies: 190
-- Name: images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE images_image_id_seq OWNED BY images.image_id;


--
-- TOC entry 194 (class 1259 OID 16533)
-- Name: interested; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE interested (
    event_id bigint,
    user_id bigint,
    interested_id integer NOT NULL
);


ALTER TABLE interested OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16567)
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
-- TOC entry 2194 (class 0 OID 0)
-- Dependencies: 197
-- Name: interested_interested_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE interested_interested_id_seq OWNED BY interested.interested_id;


--
-- TOC entry 181 (class 1259 OID 16422)
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE location (
    location_id integer NOT NULL,
    room character varying(10) NOT NULL,
    building character varying(30) NOT NULL,
    city character varying(10) NOT NULL
);


ALTER TABLE location OWNER TO postgres;

--
-- TOC entry 180 (class 1259 OID 16420)
-- Name: location_locationid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE location_locationid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE location_locationid_seq OWNER TO postgres;

--
-- TOC entry 2195 (class 0 OID 0)
-- Dependencies: 180
-- Name: location_locationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE location_locationid_seq OWNED BY location.location_id;


--
-- TOC entry 193 (class 1259 OID 16493)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE notifications (
    notification_id integer NOT NULL,
    notification_name character varying(25),
    date_sent timestamp without time zone,
    event_id bigint,
    notification_text character varying(300)
);


ALTER TABLE notifications OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 16491)
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
-- TOC entry 2196 (class 0 OID 0)
-- Dependencies: 192
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notifications_notification_id_seq OWNED BY notifications.notification_id;


--
-- TOC entry 187 (class 1259 OID 16459)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE review (
    review_id integer NOT NULL,
    event_id bigint NOT NULL,
    user_id bigint NOT NULL,
    review character varying(200) NOT NULL,
    rating integer NOT NULL,
    date_created date
);


ALTER TABLE review OWNER TO postgres;

--
-- TOC entry 186 (class 1259 OID 16457)
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
-- TOC entry 2197 (class 0 OID 0)
-- Dependencies: 186
-- Name: review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE review_review_id_seq OWNED BY review.review_id;


--
-- TOC entry 179 (class 1259 OID 16414)
-- Name: sponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sponsors (
    sponsor_id integer NOT NULL,
    sponsor_name character varying(30) NOT NULL,
    page_link character varying(30) NOT NULL,
    image_id bigint
);


ALTER TABLE sponsors OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 16412)
-- Name: sponsors_sponsorid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sponsors_sponsorid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sponsors_sponsorid_seq OWNER TO postgres;

--
-- TOC entry 2198 (class 0 OID 0)
-- Dependencies: 178
-- Name: sponsors_sponsorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sponsors_sponsorid_seq OWNED BY sponsors.sponsor_id;


--
-- TOC entry 185 (class 1259 OID 16451)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE students (
    user_id integer NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL,
    hometown character varying(25) NOT NULL,
    college character varying(50) NOT NULL,
    major character varying(25) NOT NULL,
    gender character varying(10),
    bio character varying(200),
    birthdate date,
    account_id bigint,
    image_id bigint
);


ALTER TABLE students OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 16449)
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
-- TOC entry 2199 (class 0 OID 0)
-- Dependencies: 184
-- Name: students_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE students_user_id_seq OWNED BY students.user_id;


--
-- TOC entry 189 (class 1259 OID 16477)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE transactions (
    transaction_id integer NOT NULL,
    type_of_transactions character varying(20),
    amount_charged character varying(20),
    date_done date
);


ALTER TABLE transactions OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 16475)
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
-- TOC entry 2200 (class 0 OID 0)
-- Dependencies: 188
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transactions_transaction_id_seq OWNED BY transactions.transaction_id;


--
-- TOC entry 1972 (class 2604 OID 16398)
-- Name: account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account ALTER COLUMN account_id SET DEFAULT nextval('account_accountid_seq'::regclass);


--
-- TOC entry 1986 (class 2604 OID 16627)
-- Name: asp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors ALTER COLUMN asp_id SET DEFAULT nextval('association_sponsors_asp_id_seq'::regclass);


--
-- TOC entry 1973 (class 2604 OID 16406)
-- Name: association_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations ALTER COLUMN association_id SET DEFAULT nextval('associations_associationid_seq'::regclass);


--
-- TOC entry 1983 (class 2604 OID 16554)
-- Name: category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN category_id SET DEFAULT nextval('category_category_id_seq'::regclass);


--
-- TOC entry 1976 (class 2604 OID 16441)
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events ALTER COLUMN event_id SET DEFAULT nextval('events_event_id_seq'::regclass);


--
-- TOC entry 1984 (class 2604 OID 16586)
-- Name: ec_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories ALTER COLUMN ec_id SET DEFAULT nextval('events_categories_ec_id_seq'::regclass);


--
-- TOC entry 1985 (class 2604 OID 16604)
-- Name: fe_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations ALTER COLUMN fe_id SET DEFAULT nextval('followed_associations_fe_id_seq'::regclass);


--
-- TOC entry 1980 (class 2604 OID 16488)
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images ALTER COLUMN image_id SET DEFAULT nextval('images_image_id_seq'::regclass);


--
-- TOC entry 1982 (class 2604 OID 16569)
-- Name: interested_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested ALTER COLUMN interested_id SET DEFAULT nextval('interested_interested_id_seq'::regclass);


--
-- TOC entry 1975 (class 2604 OID 16425)
-- Name: location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location ALTER COLUMN location_id SET DEFAULT nextval('location_locationid_seq'::regclass);


--
-- TOC entry 1981 (class 2604 OID 16496)
-- Name: notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications ALTER COLUMN notification_id SET DEFAULT nextval('notifications_notification_id_seq'::regclass);


--
-- TOC entry 1978 (class 2604 OID 16462)
-- Name: review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review ALTER COLUMN review_id SET DEFAULT nextval('review_review_id_seq'::regclass);


--
-- TOC entry 1974 (class 2604 OID 16417)
-- Name: sponsor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors ALTER COLUMN sponsor_id SET DEFAULT nextval('sponsors_sponsorid_seq'::regclass);


--
-- TOC entry 1977 (class 2604 OID 16454)
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students ALTER COLUMN user_id SET DEFAULT nextval('students_user_id_seq'::regclass);


--
-- TOC entry 1979 (class 2604 OID 16480)
-- Name: transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN transaction_id SET DEFAULT nextval('transactions_transaction_id_seq'::regclass);


--
-- TOC entry 2147 (class 0 OID 16395)
-- Dependencies: 175
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account (account_id, email, password, date_created, receive_notifications) FROM stdin;
1	shpe@upr.edu	password	today	no
2	wie@uprm.edu	password1	today	no
3	graciany.lebron@upr.edu	password12	today	no
4	mario.orbergoso@upr.edu	password123	today	no
5	carlos.ojeda4@upr.edu	qwerty	today	no
\.


--
-- TOC entry 2201 (class 0 OID 0)
-- Dependencies: 174
-- Name: account_accountid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_accountid_seq', 5, true);


--
-- TOC entry 2175 (class 0 OID 16624)
-- Dependencies: 203
-- Data for Name: association_sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY association_sponsors (asp_id, association_id, sponsor_id) FROM stdin;
1	1	1
\.


--
-- TOC entry 2202 (class 0 OID 0)
-- Dependencies: 202
-- Name: association_sponsors_asp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('association_sponsors_asp_id_seq', 1, true);


--
-- TOC entry 2149 (class 0 OID 16403)
-- Dependencies: 177
-- Data for Name: associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY associations (association_id, association_name, page_link, initials, bio, account_id, location_id, image_id) FROM stdin;
1	Society of Hispanic Professional Engineers	http://shpeuprm.tumblr.com/	SHPE	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \\\rdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \\\rminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\\\rea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \\\rvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\\\rcupidatat non proident, sunt	1	1	1
2	IEEE Women in Engineering - UPRM	http://wie.uprm.edu/	WIE	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \\\rdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \\\rminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\\\rea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \\\rvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\\\rcupidatat non proident, sunt	2	2	2
\.


--
-- TOC entry 2203 (class 0 OID 0)
-- Dependencies: 176
-- Name: associations_associationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_associationid_seq', 4, true);


--
-- TOC entry 2168 (class 0 OID 16551)
-- Dependencies: 196
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY category (category_id, category_name) FROM stdin;
1	Food
2	Fundraiser
3	Arts
4	Social
5	Educational
6	Business
7	Sports
8	Competition
9	Other
\.


--
-- TOC entry 2204 (class 0 OID 0)
-- Dependencies: 195
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_category_id_seq', 9, true);


--
-- TOC entry 2155 (class 0 OID 16438)
-- Dependencies: 183
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events (event_id, association_id, event_name, is_live, category, entrance_fee, location_id, registration_link, description, image_id, start_date, end_date, end_time, start_time, time_stamp) FROM stdin;
2	1	Haunted SHPE	yes	...	\N	2	https://www.youtube.com/watch?v=dQw4w9WgXcQ	Join us and have a bewitching time with SHPE RUM	7	Oct. 31, 2016	Oct. 27, 2016	9:00 pm	6:00 pm	2016-11-16 00:00:00
1	1	Development Programs Assembly	yes	Professional De	\N	1	https://www.youtube.com/watch?v=dQw4w9WgXcQ	The Society of Hispanic Professional Engineers (SHPE) invites you to our Development Programs Assembly! Learn about our different professional growth programs: The Career Prep Program, the InternSHPE Program, and Technical Program. All offer great and unique opportunities to become a better leader, professional, and student. Do not miss this opportunity!	3	Oct. 27, 2016	Oct. 27, 2016	12:00 pm	10:30 am	2016-11-17 00:00:00
\.


--
-- TOC entry 2171 (class 0 OID 16583)
-- Dependencies: 199
-- Data for Name: events_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events_categories (ec_id, event_id, category_id) FROM stdin;
1	1	1
2	1	3
3	1	5
4	1	7
5	1	9
6	2	2
7	2	4
8	2	6
9	2	8
\.


--
-- TOC entry 2205 (class 0 OID 0)
-- Dependencies: 198
-- Name: events_categories_ec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_ec_id_seq', 9, true);


--
-- TOC entry 2206 (class 0 OID 0)
-- Dependencies: 182
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_event_id_seq', 2, true);


--
-- TOC entry 2173 (class 0 OID 16601)
-- Dependencies: 201
-- Data for Name: followed_associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY followed_associations (fe_id, association_id, user_id) FROM stdin;
1	1	1
2	2	1
3	2	2
4	1	3
\.


--
-- TOC entry 2207 (class 0 OID 0)
-- Dependencies: 200
-- Name: followed_associations_fe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('followed_associations_fe_id_seq', 4, true);


--
-- TOC entry 2163 (class 0 OID 16485)
-- Dependencies: 191
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY images (image_id, image_name, image_path) FROM stdin;
1	SHPE Profile	https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1511592_794103793953169_1204815244615871931_n.png?oh=055f9de551f64f95a901ff880a6c5126&oe=58A573F7
2	WIE Profile	https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1620402_678979328807039_689288368_n.png?oh=c6adf4b93a16348fba226e12967c533e&oe=58745346
3	SHPE event 1	https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14615698_1275776692452541_7398254866605758402_o.jpg
4	Carlos Profile Image	http://2.bp.blogspot.com/-TfzSOP07oIk/VmNGMNJHwlI/AAAAAAAAAyc/vH8J3jD83ks/s1600/kevin-hart-waiting-face.jpg
5	Mario Profile Image	http://4.bp.blogspot.com/-ygOsFPhxgdQ/VmNGLqQ5NLI/AAAAAAAAAyQ/jUW_798PhOU/s1600/kevin-hart-funny-faces.jpg
6	Grciany Profile Image	http://orig04.deviantart.net/aded/f/2013/066/c/2/profile_picture_by_naivety_stock-d5x8lbn.jpg
7	Haunted SHPE	https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/14729161_1293791687317708_1785303248482865028_n.jpg?oh=31fb82748c19c1755c99f68dcb8da464&oe=58C4A084
8	Verizon Logo	https://cdn0.vox-cdn.com/thumbor/zL414AMfclnMcwL59xa3ZTXrcDw=/3x0:1418x796/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/47080648/Screen_Shot_2015-09-02_at_2.20.55_pm.0.0.png
\.


--
-- TOC entry 2208 (class 0 OID 0)
-- Dependencies: 190
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('images_image_id_seq', 10, true);


--
-- TOC entry 2166 (class 0 OID 16533)
-- Dependencies: 194
-- Data for Name: interested; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY interested (event_id, user_id, interested_id) FROM stdin;
1	1	1
1	2	2
1	3	3
2	1	4
2	2	5
\.


--
-- TOC entry 2209 (class 0 OID 0)
-- Dependencies: 197
-- Name: interested_interested_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_interested_id_seq', 6, true);


--
-- TOC entry 2153 (class 0 OID 16422)
-- Dependencies: 181
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY location (location_id, room, building, city) FROM stdin;
1	S113	Stefani	Mayaguez
2	S229	Stefani	Mayaguez
\.


--
-- TOC entry 2210 (class 0 OID 0)
-- Dependencies: 180
-- Name: location_locationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('location_locationid_seq', 2, true);


--
-- TOC entry 2165 (class 0 OID 16493)
-- Dependencies: 193
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY notifications (notification_id, notification_name, date_sent, event_id, notification_text) FROM stdin;
1	CHANGE OF CLASS ROOM	2016-11-17 00:06:00	1	So the room has changed. TO S113
2	NEW TIME	2016-11-16 00:06:00	1	Event will now start at 2.
\.


--
-- TOC entry 2211 (class 0 OID 0)
-- Dependencies: 192
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notifications_notification_id_seq', 2, true);


--
-- TOC entry 2159 (class 0 OID 16459)
-- Dependencies: 187
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY review (review_id, event_id, user_id, review, rating, date_created) FROM stdin;
1	1	1	Good Job!!	5	2005-01-04
2	1	3	Horrible	1	2005-01-05
\.


--
-- TOC entry 2212 (class 0 OID 0)
-- Dependencies: 186
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_review_id_seq', 2, true);


--
-- TOC entry 2151 (class 0 OID 16414)
-- Dependencies: 179
-- Data for Name: sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sponsors (sponsor_id, sponsor_name, page_link, image_id) FROM stdin;
1	Verizon	verizon.com	8
\.


--
-- TOC entry 2213 (class 0 OID 0)
-- Dependencies: 178
-- Name: sponsors_sponsorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sponsors_sponsorid_seq', 3, true);


--
-- TOC entry 2157 (class 0 OID 16451)
-- Dependencies: 185
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY students (user_id, first_name, last_name, hometown, college, major, gender, bio, birthdate, account_id, image_id) FROM stdin;
1	Carlos	Ojeda	San Juan	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS CARLOS	1992-01-31	5	4
2	Mario	Orbergoso	Trujillo Alto	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS MARIO	2055-01-22	4	5
3	Graciany 	Lebron	Bayamon	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS GRACIANY	1955-01-29	3	6
\.


--
-- TOC entry 2214 (class 0 OID 0)
-- Dependencies: 184
-- Name: students_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('students_user_id_seq', 3, true);


--
-- TOC entry 2161 (class 0 OID 16477)
-- Dependencies: 189
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY transactions (transaction_id, type_of_transactions, amount_charged, date_done) FROM stdin;
\.


--
-- TOC entry 2215 (class 0 OID 0)
-- Dependencies: 188
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_transaction_id_seq', 1, false);


--
-- TOC entry 1988 (class 2606 OID 16400)
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- TOC entry 2016 (class 2606 OID 16629)
-- Name: association_sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors
    ADD CONSTRAINT association_sponsors_pkey PRIMARY KEY (asp_id);


--
-- TOC entry 1990 (class 2606 OID 16411)
-- Name: associations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_pkey PRIMARY KEY (association_id);


--
-- TOC entry 2010 (class 2606 OID 16556)
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 2012 (class 2606 OID 16588)
-- Name: events_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories
    ADD CONSTRAINT events_categories_pkey PRIMARY KEY (ec_id);


--
-- TOC entry 1996 (class 2606 OID 16443)
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- TOC entry 2014 (class 2606 OID 16606)
-- Name: followed_associations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations
    ADD CONSTRAINT followed_associations_pkey PRIMARY KEY (fe_id);


--
-- TOC entry 2004 (class 2606 OID 16490)
-- Name: images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- TOC entry 2008 (class 2606 OID 16571)
-- Name: interested_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_pkey PRIMARY KEY (interested_id);


--
-- TOC entry 1994 (class 2606 OID 16427)
-- Name: location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_id);


--
-- TOC entry 2006 (class 2606 OID 16498)
-- Name: notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- TOC entry 2000 (class 2606 OID 16464)
-- Name: review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);


--
-- TOC entry 1992 (class 2606 OID 16419)
-- Name: sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors
    ADD CONSTRAINT sponsors_pkey PRIMARY KEY (sponsor_id);


--
-- TOC entry 1998 (class 2606 OID 16456)
-- Name: students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2002 (class 2606 OID 16482)
-- Name: transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 2035 (class 2606 OID 16630)
-- Name: association_sponsors_association_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors
    ADD CONSTRAINT association_sponsors_association_id_fkey FOREIGN KEY (association_id) REFERENCES associations(association_id);


--
-- TOC entry 2036 (class 2606 OID 16635)
-- Name: association_sponsors_sponsor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors
    ADD CONSTRAINT association_sponsors_sponsor_id_fkey FOREIGN KEY (sponsor_id) REFERENCES sponsors(sponsor_id);


--
-- TOC entry 2017 (class 2606 OID 16500)
-- Name: associations_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- TOC entry 2018 (class 2606 OID 16510)
-- Name: associations_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(location_id);


--
-- TOC entry 2020 (class 2606 OID 16444)
-- Name: events_associationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_associationid_fkey FOREIGN KEY (association_id) REFERENCES associations(association_id);


--
-- TOC entry 2032 (class 2606 OID 16594)
-- Name: events_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories
    ADD CONSTRAINT events_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES category(category_id);


--
-- TOC entry 2031 (class 2606 OID 16589)
-- Name: events_categories_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories
    ADD CONSTRAINT events_categories_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- TOC entry 2022 (class 2606 OID 16528)
-- Name: events_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- TOC entry 2021 (class 2606 OID 16520)
-- Name: events_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(location_id);


--
-- TOC entry 2033 (class 2606 OID 16607)
-- Name: followed_associations_association_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations
    ADD CONSTRAINT followed_associations_association_id_fkey FOREIGN KEY (association_id) REFERENCES associations(association_id);


--
-- TOC entry 2034 (class 2606 OID 16612)
-- Name: followed_associations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations
    ADD CONSTRAINT followed_associations_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- TOC entry 2027 (class 2606 OID 16515)
-- Name: images_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- TOC entry 2029 (class 2606 OID 16536)
-- Name: interested_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- TOC entry 2030 (class 2606 OID 16541)
-- Name: interested_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- TOC entry 2028 (class 2606 OID 16557)
-- Name: notifications_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- TOC entry 2025 (class 2606 OID 16465)
-- Name: review_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- TOC entry 2026 (class 2606 OID 16470)
-- Name: review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- TOC entry 2019 (class 2606 OID 16617)
-- Name: sponsors_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors
    ADD CONSTRAINT sponsors_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- TOC entry 2023 (class 2606 OID 16562)
-- Name: students_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- TOC entry 2024 (class 2606 OID 16576)
-- Name: students_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- TOC entry 2183 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-11-16 20:38:28 AST

--
-- PostgreSQL database dump complete
--
