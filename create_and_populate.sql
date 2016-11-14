--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.10
-- Dumped by pg_dump version 9.5.4

-- Started on 2016-11-12 20:06:18 AST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2141 (class 1262 OID 12141)
-- Dependencies: 2140
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 2 (class 3079 OID 11861)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2144 (class 0 OID 0)
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
-- TOC entry 2145 (class 0 OID 0)
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
    datecreated character varying(30) NOT NULL,
    receivenotifications character varying(5)
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
-- TOC entry 2146 (class 0 OID 0)
-- Dependencies: 174
-- Name: account_accountid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_accountid_seq OWNED BY account.account_id;


--
-- TOC entry 177 (class 1259 OID 16403)
-- Name: associations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE associations (
    associationid integer NOT NULL,
    associationname character varying(60) NOT NULL,
    pagelink character varying(30) NOT NULL,
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
-- TOC entry 2147 (class 0 OID 0)
-- Dependencies: 176
-- Name: associations_associationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE associations_associationid_seq OWNED BY associations.associationid;


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
-- TOC entry 2148 (class 0 OID 0)
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
    associationid bigint,
    event_name character varying(100) NOT NULL,
    is_live character varying(3) NOT NULL,
    category character varying(15),
    budget character varying(10),
    location_id bigint,
    registration_link character varying(200),
    description character varying(500),
    image_id bigint,
    start_date character varying(20),
    end_date character varying(20),
    end_time character varying(20),
    start_time character varying(20)
);


ALTER TABLE events OWNER TO postgres;

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
-- TOC entry 2149 (class 0 OID 0)
-- Dependencies: 182
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE events_event_id_seq OWNED BY events.event_id;


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
-- TOC entry 2150 (class 0 OID 0)
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
-- TOC entry 2151 (class 0 OID 0)
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
-- TOC entry 2152 (class 0 OID 0)
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
    date_sent date,
    event_id bigint,
    review_text character varying(300)
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
-- TOC entry 2153 (class 0 OID 0)
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
-- TOC entry 2154 (class 0 OID 0)
-- Dependencies: 186
-- Name: review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE review_review_id_seq OWNED BY review.review_id;


--
-- TOC entry 179 (class 1259 OID 16414)
-- Name: sponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE sponsors (
    sponsorid integer NOT NULL,
    sponsorname character varying(30) NOT NULL,
    pagelink character varying(30) NOT NULL
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
-- TOC entry 2155 (class 0 OID 0)
-- Dependencies: 178
-- Name: sponsors_sponsorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sponsors_sponsorid_seq OWNED BY sponsors.sponsorid;


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
-- TOC entry 2156 (class 0 OID 0)
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
-- TOC entry 2157 (class 0 OID 0)
-- Dependencies: 188
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE transactions_transaction_id_seq OWNED BY transactions.transaction_id;


--
-- TOC entry 1954 (class 2604 OID 16398)
-- Name: account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account ALTER COLUMN account_id SET DEFAULT nextval('account_accountid_seq'::regclass);


--
-- TOC entry 1955 (class 2604 OID 16406)
-- Name: associationid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations ALTER COLUMN associationid SET DEFAULT nextval('associations_associationid_seq'::regclass);


--
-- TOC entry 1965 (class 2604 OID 16554)
-- Name: category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN category_id SET DEFAULT nextval('category_category_id_seq'::regclass);


--
-- TOC entry 1958 (class 2604 OID 16441)
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events ALTER COLUMN event_id SET DEFAULT nextval('events_event_id_seq'::regclass);


--
-- TOC entry 1962 (class 2604 OID 16488)
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images ALTER COLUMN image_id SET DEFAULT nextval('images_image_id_seq'::regclass);


--
-- TOC entry 1964 (class 2604 OID 16569)
-- Name: interested_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested ALTER COLUMN interested_id SET DEFAULT nextval('interested_interested_id_seq'::regclass);


--
-- TOC entry 1957 (class 2604 OID 16425)
-- Name: location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location ALTER COLUMN location_id SET DEFAULT nextval('location_locationid_seq'::regclass);


--
-- TOC entry 1963 (class 2604 OID 16496)
-- Name: notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications ALTER COLUMN notification_id SET DEFAULT nextval('notifications_notification_id_seq'::regclass);


--
-- TOC entry 1960 (class 2604 OID 16462)
-- Name: review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review ALTER COLUMN review_id SET DEFAULT nextval('review_review_id_seq'::regclass);


--
-- TOC entry 1956 (class 2604 OID 16417)
-- Name: sponsorid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors ALTER COLUMN sponsorid SET DEFAULT nextval('sponsors_sponsorid_seq'::regclass);


--
-- TOC entry 1959 (class 2604 OID 16454)
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students ALTER COLUMN user_id SET DEFAULT nextval('students_user_id_seq'::regclass);


--
-- TOC entry 1961 (class 2604 OID 16480)
-- Name: transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN transaction_id SET DEFAULT nextval('transactions_transaction_id_seq'::regclass);


--
-- TOC entry 2113 (class 0 OID 16395)
-- Dependencies: 175
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account (account_id, email, password, datecreated, receivenotifications) FROM stdin;
1	shpe@upr.edu	password	today	no
2	wie@uprm.edu	password1	today	no
3	graciany.lebron@upr.edu	password12	today	no
4	mario.orbergoso@upr.edu	password123	today	no
5	carlos.ojeda4@upr.edu	qwerty	today	no
\.


--
-- TOC entry 2158 (class 0 OID 0)
-- Dependencies: 174
-- Name: account_accountid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_accountid_seq', 5, true);


--
-- TOC entry 2115 (class 0 OID 16403)
-- Dependencies: 177
-- Data for Name: associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY associations (associationid, associationname, pagelink, initials, bio, account_id, location_id, image_id) FROM stdin;
1	Society of Hispanic Professional Engineers	http://shpeuprm.tumblr.com/	SHPE	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \\\rdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \\\rminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\\\rea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \\\rvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\\\rcupidatat non proident, sunt	1	1	1
2	IEEE Women in Engineering - UPRM	http://wie.uprm.edu/	WIE	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \\\rdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \\\rminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\\\rea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \\\rvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\\\rcupidatat non proident, sunt	2	2	2
\.


--
-- TOC entry 2159 (class 0 OID 0)
-- Dependencies: 176
-- Name: associations_associationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_associationid_seq', 4, true);


--
-- TOC entry 2134 (class 0 OID 16551)
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
-- TOC entry 2160 (class 0 OID 0)
-- Dependencies: 195
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_category_id_seq', 9, true);


--
-- TOC entry 2121 (class 0 OID 16438)
-- Dependencies: 183
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events (event_id, associationid, event_name, is_live, category, budget, location_id, registration_link, description, image_id, start_date, end_date, end_time, start_time) FROM stdin;
1	1	Development Programs Assembly	yes	Professional De	\N	1	https://www.youtube.com/watch?v=dQw4w9WgXcQ	The Society of Hispanic Professional Engineers (SHPE) invites you to our Development Programs Assembly! Learn about our different professional growth programs: The Career Prep Program, the InternSHPE Program, and Technical Program. All offer great and unique opportunities to become a better leader, professional, and student. Do not miss this opportunity!	3	Oct. 27, 2016	Oct. 27, 2016	12:00 pm	10:30 am
\.


--
-- TOC entry 2161 (class 0 OID 0)
-- Dependencies: 182
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_event_id_seq', 1, true);


--
-- TOC entry 2129 (class 0 OID 16485)
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
\.


--
-- TOC entry 2162 (class 0 OID 0)
-- Dependencies: 190
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('images_image_id_seq', 10, true);


--
-- TOC entry 2132 (class 0 OID 16533)
-- Dependencies: 194
-- Data for Name: interested; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY interested (event_id, user_id, interested_id) FROM stdin;
1	1	1
1	2	2
1	3	3
\.


--
-- TOC entry 2163 (class 0 OID 0)
-- Dependencies: 197
-- Name: interested_interested_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_interested_id_seq', 4, true);


--
-- TOC entry 2119 (class 0 OID 16422)
-- Dependencies: 181
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY location (location_id, room, building, city) FROM stdin;
1	S113	Stefani	Mayaguez
2	S229	Stefani	Mayaguez
\.


--
-- TOC entry 2164 (class 0 OID 0)
-- Dependencies: 180
-- Name: location_locationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('location_locationid_seq', 2, true);


--
-- TOC entry 2131 (class 0 OID 16493)
-- Dependencies: 193
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY notifications (notification_id, notification_name, date_sent, event_id, review_text) FROM stdin;
1	CHANGE OF CLASS ROOM	2100-01-31	1	So the room has changed. TO S113
\.


--
-- TOC entry 2165 (class 0 OID 0)
-- Dependencies: 192
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notifications_notification_id_seq', 1, true);


--
-- TOC entry 2125 (class 0 OID 16459)
-- Dependencies: 187
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY review (review_id, event_id, user_id, review, rating, date_created) FROM stdin;
\.


--
-- TOC entry 2166 (class 0 OID 0)
-- Dependencies: 186
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_review_id_seq', 1, false);


--
-- TOC entry 2117 (class 0 OID 16414)
-- Dependencies: 179
-- Data for Name: sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sponsors (sponsorid, sponsorname, pagelink) FROM stdin;
\.


--
-- TOC entry 2167 (class 0 OID 0)
-- Dependencies: 178
-- Name: sponsors_sponsorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sponsors_sponsorid_seq', 1, false);


--
-- TOC entry 2123 (class 0 OID 16451)
-- Dependencies: 185
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY students (user_id, first_name, last_name, hometown, college, major, gender, bio, birthdate, account_id, image_id) FROM stdin;
1	Carlos	Ojeda	San Juan	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS CARLOS	1992-01-31	5	4
2	Mario	Orbergoso	Trujillo Alto	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS MARIO	2055-01-22	4	5
3	Graciany 	Lebron	Bayamon	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS GRACIANY	1955-01-29	3	6
\.


--
-- TOC entry 2168 (class 0 OID 0)
-- Dependencies: 184
-- Name: students_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('students_user_id_seq', 3, true);


--
-- TOC entry 2127 (class 0 OID 16477)
-- Dependencies: 189
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY transactions (transaction_id, type_of_transactions, amount_charged, date_done) FROM stdin;
\.


--
-- TOC entry 2169 (class 0 OID 0)
-- Dependencies: 188
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_transaction_id_seq', 1, false);


--
-- TOC entry 1967 (class 2606 OID 16400)
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);


--
-- TOC entry 1969 (class 2606 OID 16411)
-- Name: associations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_pkey PRIMARY KEY (associationid);


--
-- TOC entry 1989 (class 2606 OID 16556)
-- Name: category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- TOC entry 1975 (class 2606 OID 16443)
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- TOC entry 1983 (class 2606 OID 16490)
-- Name: images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- TOC entry 1987 (class 2606 OID 16571)
-- Name: interested_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_pkey PRIMARY KEY (interested_id);


--
-- TOC entry 1973 (class 2606 OID 16427)
-- Name: location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_id);


--
-- TOC entry 1985 (class 2606 OID 16498)
-- Name: notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- TOC entry 1979 (class 2606 OID 16464)
-- Name: review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_pkey PRIMARY KEY (review_id);


--
-- TOC entry 1971 (class 2606 OID 16419)
-- Name: sponsors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors
    ADD CONSTRAINT sponsors_pkey PRIMARY KEY (sponsorid);


--
-- TOC entry 1977 (class 2606 OID 16456)
-- Name: students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_pkey PRIMARY KEY (user_id);


--
-- TOC entry 1981 (class 2606 OID 16482)
-- Name: transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 1990 (class 2606 OID 16500)
-- Name: associations_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- TOC entry 1991 (class 2606 OID 16510)
-- Name: associations_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(location_id);


--
-- TOC entry 1992 (class 2606 OID 16444)
-- Name: events_associationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_associationid_fkey FOREIGN KEY (associationid) REFERENCES associations(associationid);


--
-- TOC entry 1994 (class 2606 OID 16528)
-- Name: events_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- TOC entry 1993 (class 2606 OID 16520)
-- Name: events_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(location_id);


--
-- TOC entry 1999 (class 2606 OID 16515)
-- Name: images_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- TOC entry 2001 (class 2606 OID 16536)
-- Name: interested_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- TOC entry 2002 (class 2606 OID 16541)
-- Name: interested_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested
    ADD CONSTRAINT interested_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- TOC entry 2000 (class 2606 OID 16557)
-- Name: notifications_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications
    ADD CONSTRAINT notifications_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- TOC entry 1997 (class 2606 OID 16465)
-- Name: review_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- TOC entry 1998 (class 2606 OID 16470)
-- Name: review_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review
    ADD CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES students(user_id);


--
-- TOC entry 1995 (class 2606 OID 16562)
-- Name: students_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_account_id_fkey FOREIGN KEY (account_id) REFERENCES account(account_id);


--
-- TOC entry 1996 (class 2606 OID 16576)
-- Name: students_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students
    ADD CONSTRAINT students_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


--
-- TOC entry 2143 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-11-12 20:06:19 AST

--
-- PostgreSQL database dump complete
--

