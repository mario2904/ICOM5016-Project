CREATE TABLE images (
	image_id serial,
	image_path varchar(200) NOT NULL,
	image_name varchar(200),
	PRIMARY KEY (image_id)
);

CREATE TABLE category (
	category_id serial,
	category_name varchar(30),
	PRIMARY KEY (category_id)
);

CREATE TABLE sponsors (
	sponsor_id serial,
	sponsor_name varchar(50),
	page_link varchar(200),
	image_id serial,
	PRIMARY KEY (sponsor_id),
	FOREIGN KEY (image_id) REFERENCES images(image_id)
);

CREATE TABLE account (
	account_id serial,
	email varchar(40) NOT NULL,
	password varchar(200) NOT NULL,
	receive_notifications boolean NOT NULL,
	date_created timestamp NOT NULL,
	active boolean NOT NULL,
	PRIMARY KEY (account_id)
);

CREATE TABLE students (
	user_id serial,
	first_name varchar(40) NOT NULL,
	last_name varchar(40) NOT NULL,
	hometown varchar(40) NOT NULL,
	college varchar(60) NOT NULL,
	major varchar(40) NOT NULL,
	gender varchar(10) NOT NULL,
	bio varchar(800) NOT NULL,
	birthdate date NOT NULL,
	account_id serial,
	image_id serial,
	PRIMARY KEY (user_id),
	FOREIGN KEY (account_id) REFERENCES account(account_id),
	FOREIGN KEY (image_id) REFERENCES images(image_id)						-- CHANGED
);

CREATE TABLE associations (
	association_id serial,
	association_name varchar(80) NOT NULL,
	page_link varchar(200) NOT NULL,
	initials varchar(10) NOT NULL,
	bio varchar(800) NOT NULL,
	association_location varchar(100) NOT NULL,
	account_id serial,
	image_id serial,
	PRIMARY KEY (association_id),
	FOREIGN KEY (account_id) REFERENCES account(account_id),
	FOREIGN KEY (image_id) REFERENCES images(image_id)
);

CREATE TABLE association_sponsors (
	asp_id serial,
	association_id serial,
	sponsor_id serial,
	PRIMARY KEY (asp_id),
	FOREIGN KEY (association_id) REFERENCES associations(association_id),
	FOREIGN KEY (sponsor_id) REFERENCES sponsors (sponsor_id)
);

CREATE TABLE events (
	event_id serial,
	event_name varchar(100) NOT NULL,
	registration_link varchar(200) NOT NULL,
	description varchar(800) NOT NULL,
	entrance_fee decimal(5,2),
	start_date date NOT NULL,
	end_date date NOT NULL,
	end_time time NOT NULL,
	start_time time NOT NULL,
	time_stamp timestamp NOT NULL,
	event_location varchar(100) NOT NULL,
	is_live boolean,
	association_id serial,
	image_id serial,
	PRIMARY KEY (event_id),
	FOREIGN KEY (image_id) REFERENCES images(image_id)
);

CREATE TABLE events_categories (
	ec_id serial,
	event_id serial,
	category_id serial,
	PRIMARY KEY (ec_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id),
	FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE interested (
	interested_id serial,
	event_id serial,
	user_id serial,
	PRIMARY KEY (interested_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id),
	FOREIGN KEY (user_id) REFERENCES students(user_id)
);

CREATE TABLE notifications (
	notification_id serial,
	notification_name varchar(100),
	notification_text varchar(600),
	date_sent timestamp NOT NULL,
	event_id serial,
	PRIMARY KEY (notification_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id)
);

CREATE TABLE review (
	review_id serial,
	review varchar(300),
	rating integer NOT NULL,
	date_created date NOT NULL,
	event_id serial,
	user_id serial,
	PRIMARY KEY (review_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id),
	FOREIGN KEY (user_id) REFERENCES students(user_id)
);

CREATE TABLE followed_associations (
	fe_id serial,
	user_id serial,
	association_id serial,
	PRIMARY KEY (fe_id),
	FOREIGN KEY (user_id) REFERENCES students(user_id),
	FOREIGN KEY (association_id) REFERENCES associations(association_id)
);

CREATE TABLE transactions (
	transaction_id serial,
	transaction_text varchar(400),
	ammount_charged decimal(5,2) NOT NULL,
	time_stamp timestamp NOT NULL,
	user_id serial,
	association_id serial,
	event_id serial,
	PRIMARY KEY (transaction_id),
	FOREIGN KEY (user_id) REFERENCES students(user_id),
	FOREIGN KEY (association_id) REFERENCES associations(association_id),
	FOREIGN KEY (event_id) REFERENCES events(event_id)					-- CHANGED
);
