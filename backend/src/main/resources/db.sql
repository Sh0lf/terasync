-- USERS
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

-- RATING / RECOMMENDATION SYSTEM

CREATE TABLE RatingList
(
    ratingListId INT IDENTITY (1, 1) PRIMARY KEY,
    rating       DECIMAL(3, 2) NOT NULL,
    comment      VARCHAR(255)  NOT NULL,
    customerId   INT           NOT NULL,
    businessId   INT           NOT NULL,
    constraint customer_fk FOREIGN KEY (customerId) REFERENCES Customer (customerId),
    constraint business_fk FOREIGN KEY (businessId) REFERENCES Business (businessId),
    constraint check_rating check (rating >= 0 and rating <= 5)
)

-- ORDERING / DELIVERY SYSTEM
CREATE TABLE DeliveryServiceList
(
    deliveryServiceListId INT IDENTITY (1, 1) PRIMARY KEY,
    deliveryServiceId     INT NOT NULL,
    businessId            INT NOT NULL,
    constraint deliveryService_fk FOREIGN KEY (deliveryServiceId) REFERENCES DeliveryService (deliveryServiceId),
    constraint business_fk FOREIGN KEY (businessId) REFERENCES Business (businessId)
);

CREATE TABLE Status
(
    statusId INT IDENTITY (1, 1) PRIMARY KEY,
    status   VARCHAR(255) NOT NULL
);

CREATE TABLE Packaging
(
    packagingId INT IDENTITY (1, 1) PRIMARY KEY,
    packaging   VARCHAR(255) NOT NULL,
);

CREATE TABLE CustomerOrder
(
    customerOrderId   INT IDENTITY (1, 1) PRIMARY KEY,
    timestamp         DATETIME      NOT NULL,
    statusId          INT           NOT NULL,
    packagingId       INT           NOT NULL,
    minTemp           DECIMAL(5, 2) NOT NULL,
    maxTemp           DECIMAL(5, 2) NOT NULL,
    deliveryTime      DATETIME      NOT NULL,
    customerId        INT           NOT NULL,
    businessId        INT           NOT NULL,
    deliveryServiceId INT           NOT NULL,
    deliveryPersonId  INT           NOT NULL,

)

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



CREATE TABLE Faq
(
    faqId    INT IDENTITY (1, 1) PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer   VARCHAR(255) NOT NULL
);




