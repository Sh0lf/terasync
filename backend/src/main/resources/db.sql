CREATE TABLE Customer
(
    customerId INT IDENTITY (1, 1) PRIMARY KEY,
    firstName  VARCHAR(255) NOT NULL,
    lastName   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    username   VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL
);

CREATE TABLE Admin
(
    adminId   INT IDENTITY (1, 1) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    email     VARCHAR(255) NOT NULL,
    username  VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL
);

CREATE TABLE DeliveryService
(
    deliveryServiceId INT IDENTITY (1, 1) PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL,
    username          VARCHAR(255) NOT NULL,
    password          VARCHAR(255) NOT NULL
);

CREATE TABLE Business
(
    businessId INT IDENTITY (1, 1) PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    address    VARCHAR(255) NOT NULL,
    phone      VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    username   VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL
);

CREATE TABLE Product
(
    productId   INT IDENTITY (1, 1) PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    description VARCHAR(255)   NOT NULL,
    isVegan     BIT            NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    businessId  INT            NOT NULL,
    constraint business_fk FOREIGN KEY (businessId) REFERENCES Business (businessId)
);

CREATE TABLE Status
(
    statusId INT IDENTITY (1, 1) PRIMARY KEY,
    status   VARCHAR(255) NOT NULL
);

CREATE TABLE OrderList
(
    orderId           INT IDENTITY (1, 1) PRIMARY KEY,
    totalPrice        DECIMAL(10, 2) NOT NULL,
    deliveryServiceId INT            NOT NULL,
    customerId        INT            NOT NULL,
    productId         INT            NOT NULL,
    status            varchar(255)   NOT NULL,
    constraint delivery_fk FOREIGN KEY (deliveryServiceId) REFERENCES DeliveryService (deliveryServiceId),
    constraint customer_fk FOREIGN KEY (customerId) REFERENCES Customer (customerId),
    constraint product_fk FOREIGN KEY (productId) REFERENCES Product (productId),
    constraint status_fk FOREIGN KEY (status) REFERENCES Status (status)
);

CREATE TABLE RatingList
(
    ratingId   INT IDENTITY (1, 1) PRIMARY KEY,
    rating     DECIMAL(3, 2) NOT NULL,
    comment    VARCHAR(255)  NOT NULL,
    customerId INT           NOT NULL,
    businessId INT           NOT NULL,
    constraint customer_fk FOREIGN KEY (customerId) REFERENCES Customer (customerId),
    constraint business_fk FOREIGN KEY (businessId) REFERENCES Business (businessId)
);

CREATE TABLE Faq
(
    faqId    INT IDENTITY (1, 1) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer   VARCHAR(255) NOT NULL
);




