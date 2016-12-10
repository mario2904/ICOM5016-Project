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
    email character varying(35) NOT NULL,
    password character varying(20) NOT NULL,
    receive_notifications character varying(5),
    date_created timestamp without time zone
);


ALTER TABLE account OWNER TO postgres;

--
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
-- Name: account_accountid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE account_accountid_seq OWNED BY account.account_id;


--
-- Name: association_sponsors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE association_sponsors (
    asp_id integer NOT NULL,
    association_id bigint,
    sponsor_id bigint
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
-- Name: associations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE associations (
    association_id integer NOT NULL,
    association_name character varying(60) NOT NULL,
    page_link character varying(30) NOT NULL,
    initials character varying(10) NOT NULL,
    bio character varying(400),
    account_id bigint NOT NULL,
    location_id bigint,
    image_id bigint
);


ALTER TABLE associations OWNER TO postgres;

--
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
-- Name: associations_associationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE associations_associationid_seq OWNED BY associations.association_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    category_id integer NOT NULL,
    category_name character varying(20)
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
-- Name: event_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE event_stats (
    stat_id integer NOT NULL,
    stat_date timestamp without time zone,
    interested_count integer,
    event_id bigint
);


ALTER TABLE event_stats OWNER TO postgres;

--
-- Name: event_stats_stat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE event_stats_stat_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE event_stats_stat_id_seq OWNER TO postgres;

--
-- Name: event_stats_stat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE event_stats_stat_id_seq OWNED BY event_stats.stat_id;


--
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
-- Name: events_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE events_categories (
    ec_id integer NOT NULL,
    event_id bigint,
    category_id bigint
);


ALTER TABLE events_categories OWNER TO postgres;

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
-- Name: followed_associations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE followed_associations (
    fe_id integer NOT NULL,
    association_id bigint,
    user_id bigint
);


ALTER TABLE followed_associations OWNER TO postgres;

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
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE images (
    image_id integer NOT NULL,
    image_name character varying(25),
    image_path character varying(200)
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
    event_id bigint,
    user_id bigint,
    interested_id integer NOT NULL
);


ALTER TABLE interested OWNER TO postgres;

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
-- Name: location_locationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE location_locationid_seq OWNED BY location.location_id;


--
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
    event_id bigint NOT NULL,
    user_id bigint NOT NULL,
    review character varying(200) NOT NULL,
    rating integer NOT NULL,
    date_created date
);


ALTER TABLE review OWNER TO postgres;

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
-- Name: sponsors_sponsorid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE sponsors_sponsorid_seq OWNED BY sponsors.sponsor_id;


--
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
    type_of_transactions character varying(20),
    amount_charged character varying(20),
    date_done date
);


ALTER TABLE transactions OWNER TO postgres;

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
-- Name: account_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account ALTER COLUMN account_id SET DEFAULT nextval('account_accountid_seq'::regclass);


--
-- Name: asp_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY association_sponsors ALTER COLUMN asp_id SET DEFAULT nextval('association_sponsors_asp_id_seq'::regclass);


--
-- Name: association_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations ALTER COLUMN association_id SET DEFAULT nextval('associations_associationid_seq'::regclass);


--
-- Name: category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN category_id SET DEFAULT nextval('category_category_id_seq'::regclass);


--
-- Name: stat_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY event_stats ALTER COLUMN stat_id SET DEFAULT nextval('event_stats_stat_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events ALTER COLUMN event_id SET DEFAULT nextval('events_event_id_seq'::regclass);


--
-- Name: ec_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events_categories ALTER COLUMN ec_id SET DEFAULT nextval('events_categories_ec_id_seq'::regclass);


--
-- Name: fe_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY followed_associations ALTER COLUMN fe_id SET DEFAULT nextval('followed_associations_fe_id_seq'::regclass);


--
-- Name: image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images ALTER COLUMN image_id SET DEFAULT nextval('images_image_id_seq'::regclass);


--
-- Name: interested_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY interested ALTER COLUMN interested_id SET DEFAULT nextval('interested_interested_id_seq'::regclass);


--
-- Name: location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location ALTER COLUMN location_id SET DEFAULT nextval('location_locationid_seq'::regclass);


--
-- Name: notification_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notifications ALTER COLUMN notification_id SET DEFAULT nextval('notifications_notification_id_seq'::regclass);


--
-- Name: review_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY review ALTER COLUMN review_id SET DEFAULT nextval('review_review_id_seq'::regclass);


--
-- Name: sponsor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY sponsors ALTER COLUMN sponsor_id SET DEFAULT nextval('sponsors_sponsorid_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY students ALTER COLUMN user_id SET DEFAULT nextval('students_user_id_seq'::regclass);


--
-- Name: transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY transactions ALTER COLUMN transaction_id SET DEFAULT nextval('transactions_transaction_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY account (account_id, email, password, receive_notifications, date_created) FROM stdin;
1	shpe@upr.edu	password	no	2016-11-16 00:00:00
2	wie@uprm.edu	password1	no	1992-01-31 00:00:00
3	graciany.lebron@upr.edu	password12	no	2016-11-17 00:00:00
4	mario.orbegoso@upr.edu	password123	no	2016-11-17 00:00:00
5	carlos.ojeda4@upr.edu	qwerty	no	2016-11-17 00:00:00
6	kevin.hart@upr.edu	harambe	no	2016-11-17 00:00:00
7	therock@upr.edu	thepebble	no	2016-11-17 00:00:00
8	ip@upr.edu	ipRocks	no	2016-11-17 00:00:00
9	ieee@upr.edu	password	no	2016-11-17 00:00:00
10	swe@upr.edu	passwd	no	2016-11-17 00:00:00
11	emmawatson@upr.edu	harrypotter	yes	2016-11-17 00:00:00
\.


--
-- Name: account_accountid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('account_accountid_seq', 11, true);


--
-- Data for Name: association_sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY association_sponsors (asp_id, association_id, sponsor_id) FROM stdin;
1	1	1
2	1	3
3	1	7
4	2	10
5	2	8
6	2	9
7	2	4
8	3	1
9	3	2
10	4	6
11	4	2
12	4	10
13	5	1
14	5	3
15	5	5
17	5	9
16	5	7
\.


--
-- Name: association_sponsors_asp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('association_sponsors_asp_id_seq', 17, true);


--
-- Data for Name: associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY associations (association_id, association_name, page_link, initials, bio, account_id, location_id, image_id) FROM stdin;
1	Society of Hispanic Professional Engineers	http://shpeuprm.tumblr.com/	SHPE	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \\\rdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \\\rminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\\\rea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \\\rvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\\\rcupidatat non proident, sunt	1	1	1
2	IEEE Women in Engineering - UPRM	http://wie.uprm.edu/	WIE	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed \\\rdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \\\rminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex\\\rea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate \\\rvelit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat\\\rcupidatat non proident, sunt	2	2	2
3	Idea Platform	google.com	IP	We are Idea Platfrom	8	6	21
4	Institute of Electrical and Electronics Engineers	ieee.org	IEEE	IEEE!!!!!!	9	7	22
5	Society of Women in Engineering	google.com	SWE	P-P-Power!	10	8	23
\.


--
-- Name: associations_associationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('associations_associationid_seq', 9, true);


--
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
10	Music
\.


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_category_id_seq', 10, true);


--
-- Data for Name: event_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY event_stats (stat_id, stat_date, interested_count, event_id) FROM stdin;
\.


--
-- Name: event_stats_stat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('event_stats_stat_id_seq', 1, false);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY events (event_id, association_id, event_name, is_live, category, entrance_fee, location_id, registration_link, description, image_id, start_date, end_date, end_time, start_time, time_stamp) FROM stdin;
6	5	Movie Night: Dr. Strange	yes	\N	\N	7	swe.uprm.edu	SWEblings, queremos informarles que el "Movie Night" que estaba pautado para HOY a las 6:00 pm ha sido movido a las 9:00pm. Se realizó el cambio debido a que muchas personas tenían examen o clase a la hora antes anunciada. Disculpen los inconvenientes, tratamos de llegar a un acuerdo que beneficiara a la mayoria.\rLa película sigue siendo "Dr. Strange" y empieza a las 9:10pm.\r¡Los esperamos!\rNos encontraremos a las 9:00pm en la entrada del cine. Aquellos que estén interesados favor de confirmar a	27	Nov. 17, 2016	Nov. 17, 2016	12:00 am	9:00 pm	2016-11-17 00:00:00
1	1	Development Programs Assembly	yes	Professional De	\N	1	https://www.youtube.com/watch?v=dQw4w9WgXcQ	The Society of Hispanic Professional Engineers (SHPE) invites you to our Development Programs Assembly! Learn about our different professional growth programs: The Career Prep Program, the InternSHPE Program, and Technical Program. All offer great and unique opportunities to become a better leader, professional, and student. Do not miss this opportunity!	3	Oct. 27, 2016	Oct. 27, 2016	12:00 pm	10:30 am	2016-11-17 00:00:00
2	1	Haunted SHPE	no	...	\N	2	https://www.youtube.com/watch?v=dQw4w9WgXcQ	Join us and have a bewitching time with SHPE RUM	7	Oct. 31, 2016	Oct. 27, 2016	9:00 pm	6:00 pm	2016-11-16 00:00:00
3	3	¿Quieres Ganar un Hackathon?	no	...	\N	3	https://www.youtube.com/watch?v=dQw4w9WgXcQ	HACKATHON	24	Oct. 11, 2016	Oct. 11, 2016	10:30 am	3:00 pm	2016-11-17 00:00:00
4	3	Smash Bros. Tournament	yes	\N	\N	5	google.com	Let's get ready to RUMBLE!!!	25	Nov 20, 2016	Nov 20, 2016	10:30 am	1:00 pm	2016-11-18 00:00:00
5	4	Circuits Lab Workshop	yes	\N	\N	6	google.com	Learn to Circuit	26	Dec. 14, 2016	Dec, 14, 2016	6:00 pm	8:00 pm	2016-11-16 00:00:00
\.


--
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
-- Name: events_categories_ec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_categories_ec_id_seq', 9, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('events_event_id_seq', 6, true);


--
-- Data for Name: followed_associations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY followed_associations (fe_id, association_id, user_id) FROM stdin;
1	1	1
2	2	1
3	2	2
4	1	3
5	3	2
6	5	6
7	5	5
8	4	1
9	4	2
10	3	6
11	4	6
\.


--
-- Name: followed_associations_fe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('followed_associations_fe_id_seq', 11, true);


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY images (image_id, image_name, image_path) FROM stdin;
10	Spotify Lofo	https://developer.spotify.com/wp-content/uploads/2014/06/spotify-design.png
1	SHPE Profile	https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1511592_794103793953169_1204815244615871931_n.png?oh=055f9de551f64f95a901ff880a6c5126&oe=58A573F7
2	WIE Profile	https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/1620402_678979328807039_689288368_n.png?oh=c6adf4b93a16348fba226e12967c533e&oe=58745346
3	SHPE event 1	https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14615698_1275776692452541_7398254866605758402_o.jpg
4	Carlos Profile Image	http://2.bp.blogspot.com/-TfzSOP07oIk/VmNGMNJHwlI/AAAAAAAAAyc/vH8J3jD83ks/s1600/kevin-hart-waiting-face.jpg
6	Grciany Profile Image	http://orig04.deviantart.net/aded/f/2013/066/c/2/profile_picture_by_naivety_stock-d5x8lbn.jpg
7	Haunted SHPE	https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/14729161_1293791687317708_1785303248482865028_n.jpg?oh=31fb82748c19c1755c99f68dcb8da464&oe=58C4A084
8	Verizon Logo	https://cdn0.vox-cdn.com/thumbor/zL414AMfclnMcwL59xa3ZTXrcDw=/3x0:1418x796/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/47080648/Screen_Shot_2015-09-02_at_2.20.55_pm.0.0.png
26	Circuits Lab	https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14543654_1328305037188137_8919927744200733943_o.png
25	Smash Bro.	http://1u88jj3r4db2x4txp44yqfj1.wpengine.netdna-cdn.com/wp-content/uploads/2016/03/smashmelee.jpg
24	Ganar Hackathon	https://scontent-mia1-1.xx.fbcdn.net/t31.0-8/14701042_887235714711763_1763279942730887759_o.jpg
23	SWE Profile	https://scontent-mia1-2.xx.fbcdn.net/v/t1.0-9/12037936_1099401136737560_1578635137948238899_n.jpg?oh=18a7d0543739ffc4120a5974ebfc7162&oe=588B9FC4
22	IEEE Profile	http://wie.uprm.edu/uploads/2/2/5/5/22558810/3691683_orig.jpg
21	IP Profile	https://scontent-mia1-1.xx.fbcdn.net/v/t1.0-9/11075167_628822830553054_4682981240345315035_n.png?oh=8c50c6447d46bf9d6a4d61f8974cf279&oe=58A3632B
20	EW Profile	http://img.memecdn.com/emma-watson--quot-the-more-people-can-wonder-quot_o_1215827.jpg
19	DJ Profile	https://pbs.twimg.com/media/BsrkPu2CUAEWSqY.jpg
18	KH Profile	http://4.bp.blogspot.com/-ygOsFPhxgdQ/VmNGLqQ5NLI/AAAAAAAAAyQ/jUW_798PhOU/s1600/kevin-hart-funny-faces.jpg
5	Mario Profile Image	https://s-media-cache-ak0.pinimg.com/564x/0e/07/0e/0e070edc7e2aa03fd15645f4a1b9ba32.jpg
17	GM Logo	https://upload.wikimedia.org/wikipedia/en/b/b6/GM,_logo.png
16	General Electric Logo	http://cdn-0.famouslogos.us/images/general-electric-logo.jpg
15	UPRM Logo	http://www.uprm.edu/wdt/resources/portico1.gif
14	Lockheed Logo	http://www.pngpix.com/wp-content/uploads/2016/07/PNGPIX-COM-Lockheed-Martin-Logo-PNG-Transparent-2.png
13	Boeing Logo	http://1.bp.blogspot.com/-kLHu6zQLfMw/TdQxwBU2jfI/AAAAAAAAUB4/ZSbrhaHqmGA/s1600/boeing_Logo_10.jpg
12	Exxon Mobile Logo	http://www.ieyenews.com/wordpress/wp-content/uploads/2016/08/exxon-mobil.jpg
11	Chevron Logo	http://troutlakewashington.com/wp-content/uploads/ChevronLogo.png
9	Harris Logo	https://static1.squarespace.com/static/53752262e4b0acdd68de7377/t/53869050e4b0149a746ccec3/1401327703838/Harris+Logo.png
27	Movie Night: Dr.Strange	https://upload.wikimedia.org/wikipedia/en/0/0a/Benedict_Cumberbatch_as_Doctor_Strange.jpg
30	Default Profile Image	/images/defaults/default-profile.jpg
\.


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('images_image_id_seq', 30, true);


--
-- Data for Name: interested; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY interested (event_id, user_id, interested_id) FROM stdin;
1	1	1
1	2	2
1	3	3
2	1	4
2	2	5
3	6	7
6	5	8
4	3	9
4	5	10
6	1	11
6	2	12
5	4	13
5	3	14
\.


--
-- Name: interested_interested_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('interested_interested_id_seq', 14, true);


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY location (location_id, room, building, city) FROM stdin;
1	S113	Stefani	Mayaguez
2	S229	Stefani	Mayaguez
3	Faccio	Faccio	Mayaguez
4	RC	Roberto Clemente	San Juan
5	CC	Centro de Convenciones	San Juan
6	CE-305	Centro de Estudiantes	Mayaguez
7	S307	Stefani	Mayaguez
8	Q308	Quimica	Mayaguez
\.


--
-- Name: location_locationid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('location_locationid_seq', 10, true);


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY notifications (notification_id, notification_name, date_sent, event_id, notification_text) FROM stdin;
1	CHANGE OF CLASS ROOM	2016-11-17 00:06:00	1	So the room has changed. TO S113
2	NEW TIME	2016-11-16 00:06:00	1	Event will now start at 2.
\.


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notifications_notification_id_seq', 2, true);


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY review (review_id, event_id, user_id, review, rating, date_created) FROM stdin;
1	1	1	Good Job!!	5	2005-01-04
2	1	3	Horrible	1	2005-01-05
\.


--
-- Name: review_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('review_review_id_seq', 2, true);


--
-- Data for Name: sponsors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY sponsors (sponsor_id, sponsor_name, page_link, image_id) FROM stdin;
1	Verizon	verizon.com	8
2	Spotify	spotify.com	10
3	Chevron	chevron.com	11
4	Exxon Mobile	exxonmobile.com	12
5	Boeing	boeing.com	13
6	Harris	harris.com	9
7	Lockheed Martin	lockheedmartin.com	14
8	UPRM	upmr.edu	15
9	General Electric	ge.com	16
10	General Motors	gm.com	17
\.


--
-- Name: sponsors_sponsorid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sponsors_sponsorid_seq', 11, true);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY students (user_id, first_name, last_name, hometown, college, major, gender, bio, birthdate, account_id, image_id) FROM stdin;
1	Carlos	Ojeda	San Juan	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS CARLOS	1992-01-31	5	4
3	Graciany 	Lebron	Bayamon	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS GRACIANY	1955-01-29	3	6
2	Mario	Orbegoso	Trujillo Alto	Universidad de Puerto Rico - Mayaguez	ICOM	Male	HELLO MY NAME IS MARIO	2001-01-22	4	5
4	Kevin	Hart	Chicago	University of Illinois	Comedy	Male	Say it with you chest!	1980-02-03	6	18
5	Dwayne	Johnson	Texas	University of Texas - Austin	Acting	Male	Do you smell!!! What the Rock is cooking?	1979-05-08	7	19
6	Emma	Watson	Oxford	Oxford University	Acting	Female	You're a wizard Harry!	1992-07-08	11	20
\.


--
-- Name: students_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('students_user_id_seq', 6, true);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY transactions (transaction_id, type_of_transactions, amount_charged, date_done) FROM stdin;
\.


--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('transactions_transaction_id_seq', 1, false);


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
-- Name: event_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY event_stats
    ADD CONSTRAINT event_stats_pkey PRIMARY KEY (stat_id);


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
-- Name: location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_id);


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
-- Name: associations_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY associations
    ADD CONSTRAINT associations_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(location_id);


--
-- Name: event_stats_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY event_stats
    ADD CONSTRAINT event_stats_event_id_fkey FOREIGN KEY (event_id) REFERENCES events(event_id);


--
-- Name: events_associationid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_associationid_fkey FOREIGN KEY (association_id) REFERENCES associations(association_id);


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
-- Name: events_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_location_id_fkey FOREIGN KEY (location_id) REFERENCES location(location_id);


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
-- Name: images_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY images
    ADD CONSTRAINT images_image_id_fkey FOREIGN KEY (image_id) REFERENCES images(image_id);


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
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

