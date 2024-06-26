-- USERS
CREATE TABLE Customer
(
    customerId       INT IDENTITY (1, 1) PRIMARY KEY,
    firstName        VARCHAR(255) NOT NULL,
    lastName         VARCHAR(255) NOT NULL,
    email            VARCHAR(255) NOT NULL UNIQUE,
    username         VARCHAR(255) NOT NULL,
    password         VARCHAR(255) NOT NULL,
    token            VARCHAR(255),
    emailVerified    BIT          NOT NULL DEFAULT (0),
    registrationDate DATETIME     NOT NULL DEFAULT (GETDATE()),
    pfpImgPath       VARCHAR(255)
);

CREATE TABLE Admin
(
    adminId          INT IDENTITY (1, 1) PRIMARY KEY,
    firstName        VARCHAR(255) NOT NULL,
    lastName         VARCHAR(255) NOT NULL,
    email            VARCHAR(255) NOT NULL UNIQUE,
    username         VARCHAR(255) NOT NULL,
    password         VARCHAR(255) NOT NULL,
    token            VARCHAR(255),
    emailVerified    BIT          NOT NULL DEFAULT (0),
    registrationDate DATETIME     NOT NULL DEFAULT (GETDATE()),
    pfpImgPath       VARCHAR(255)
);

CREATE TABLE Business
(
    businessId       INT IDENTITY (1, 1) PRIMARY KEY,
    name             VARCHAR(255) NOT NULL,
    address          VARCHAR(255) NOT NULL,
    phone            VARCHAR(255) NOT NULL,
    email            VARCHAR(255) NOT NULL UNIQUE,
    username         VARCHAR(255) NOT NULL,
    password         VARCHAR(255) NOT NULL,
    token            VARCHAR(255),
    emailVerified    BIT          NOT NULL DEFAULT (0),
    registrationDate DATETIME     NOT NULL DEFAULT (GETDATE()),
    approved         BIT          NOT NULL DEFAULT (0),
    pfpImgPath       VARCHAR(255),
    thumbnail        VARCHAR(255)
);

CREATE TABLE DeliveryService
(
    deliveryServiceId INT IDENTITY (1, 1) PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL UNIQUE,
    username          VARCHAR(255) NOT NULL,
    password          VARCHAR(255) NOT NULL,
    token             VARCHAR(255),
    emailVerified     BIT          NOT NULL DEFAULT (0),
    registrationDate  DATETIME     NOT NULL DEFAULT (GETDATE()),
    approved          BIT          NOT NULL DEFAULT (0),
    pfpImgPath        VARCHAR(255)
);

CREATE TABLE DeliveryPerson
(
    deliveryPersonId  INT IDENTITY (1, 1) PRIMARY KEY,
    firstName         VARCHAR(255) NOT NULL,
    lastName          VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL UNIQUE,
    username          VARCHAR(255) NOT NULL,
    password          VARCHAR(255) NOT NULL,
    token             VARCHAR(255),
    emailVerified     BIT          NOT NULL DEFAULT (0),
    registrationDate  DATETIME     NOT NULL DEFAULT (GETDATE()),
    pfpImgPath        VARCHAR(255),
    deliveryServiceId INT          NOT NULL,
    constraint deliveryService_deliveryPerson_fk FOREIGN KEY (deliveryServiceId) REFERENCES DeliveryService (deliveryServiceId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- CUSTOM ADDRESS
CREATE TABLE Address
(
    addressId      INT IDENTITY (1, 1) PRIMARY KEY,
    country        VARCHAR(255) NOT NULL,
    street         VARCHAR(255) NOT NULL,
    postalCode     VARCHAR(255) NOT NULL,
    city           VARCHAR(255) NOT NULL,
    defaultAddress BIT          NOT NULL DEFAULT (0),
    info           VARCHAR(255),
    customerId     INT          NOT NULL,
    constraint customer_address_fk FOREIGN KEY (customerId) REFERENCES Customer (customerId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- RATING / RECOMMENDATION SYSTEM
CREATE TABLE RatingList
(
    ratingListId INT IDENTITY (1, 1) PRIMARY KEY,
    rating       DECIMAL(3, 2) NOT NULL,
    comment      VARCHAR(255),
    ratingDate   DATETIME      NOT NULL DEFAULT (GETDATE()),
    customerId   INT           NOT NULL,
    businessId   INT           NOT NULL,
    constraint customer_ratingList_fk FOREIGN KEY (customerId) REFERENCES Customer (customerId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    constraint business_ratingList_fk FOREIGN KEY (businessId) REFERENCES Business (businessId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    constraint check_ratingList_rating check (rating >= 0 and rating <= 5)
)

-- ORDERING / DELIVERY SYSTEM
CREATE TABLE DeliveryServiceList
(
    deliveryServiceListId INT IDENTITY (1, 1) PRIMARY KEY,
    deliveryServiceId     INT NOT NULL,
    businessId            INT NOT NULL,
    constraint deliveryService_deliveryServiceList_fk FOREIGN KEY (deliveryServiceId) REFERENCES DeliveryService (deliveryServiceId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    constraint business_deliveryServiceList_fk FOREIGN KEY (businessId) REFERENCES Business (businessId)
        ON DELETE CASCADE ON UPDATE CASCADE,
);

CREATE TABLE Status
(
    statusId INT IDENTITY (1, 1) PRIMARY KEY,
    status   VARCHAR(255) NOT NULL
);

CREATE TABLE CustomerOrder
(
    customerOrderId   INT IDENTITY (1, 1) PRIMARY KEY,
    creationTime      DATETIME      NOT NULL DEFAULT (GETDATE()),
    minTemp           DECIMAL(5, 2) NOT NULL DEFAULT (0),
    maxTemp           DECIMAL(5, 2) NOT NULL DEFAULT (0),
    deliveryTime      DATETIME,
    rated             BIT           NOT NULL DEFAULT (0),
    statusId          INT           NOT NULL,
    packagingId       INT           NOT NULL,
    customerId        INT           NOT NULL,
    businessId        INT           NOT NULL,
    deliveryServiceId INT           NOT NULL,
    deliveryPersonId  INT           NOT NULL,
    addressId         INT           NOT NULL,
    paymentMethodId   INT           NOT NULL,
    constraint status_customerOrder_fk FOREIGN KEY (statusId) REFERENCES Status (statusId),
    constraint packaging_customerOrder_fk FOREIGN KEY (packagingId) REFERENCES Packaging (packagingId),
    constraint customer_customerOrder_fk FOREIGN KEY (customerId) REFERENCES Customer (customerId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    constraint business_customerOrder_fk FOREIGN KEY (businessId) REFERENCES Business (businessId)
        ON DELETE NO ACTION ON UPDATE CASCADE,
    constraint deliveryService_customerOrder_fk FOREIGN KEY (deliveryServiceId) REFERENCES DeliveryService (deliveryServiceId)
        ON DELETE NO ACTION ON UPDATE CASCADE,
    constraint deliveryPerson_customerOrder_fk FOREIGN KEY (deliveryPersonId) REFERENCES DeliveryPerson (deliveryPersonId)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    constraint address_customerOrder_fk FOREIGN KEY (addressId) REFERENCES Address (addressId)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    constraint paymentMethod_customerOrder_fk FOREIGN KEY (paymentMethodId) REFERENCES PaymentMethod (paymentMethodId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    constraint temp_customerOrder_check check (minTemp >= -273.15 and maxTemp >= -273.15 and minTemp <= maxTemp)
)

CREATE TABLE Packaging
(
    packagingId INT IDENTITY (1, 1) PRIMARY KEY,
    packaging   VARCHAR(255) NOT NULL,
);

CREATE TABLE Product
(
    productId    INT IDENTITY (1, 1) PRIMARY KEY,
    name         VARCHAR(255)   NOT NULL,
    description  VARCHAR(255),
    vegan        BIT            NOT NULL DEFAULT (0),
    price        DECIMAL(10, 2) NOT NULL,
    creationTime DATETIME       NOT NULL DEFAULT (GETDATE()),
    businessId   INT            NOT NULL,
    constraint business_product_fk FOREIGN KEY (businessId) REFERENCES Business (businessId)
        ON DELETE CASCADE ON UPDATE CASCADE,
    constraint price_product_check check (price > 0)
);

CREATE TABLE CustomerOrderList
(
    customerOrderListId INT IDENTITY (1, 1) PRIMARY KEY,
    selectionTime       DATETIME NOT NULL DEFAULT (GETDATE()),
    quantity            INT      NOT NULL DEFAULT (1),
    customerOrderId     INT      NOT NULL,
    productId           INT      NOT NULL,
    constraint customerOrder_customerOrderList_fk FOREIGN KEY (customerOrderId) REFERENCES CustomerOrder (customerOrderId)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    constraint product_customerOrderList_fk FOREIGN KEY (productId) REFERENCES Product (productId)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    constraint quantity_customerOrderList_check check (quantity > 0)
);

CREATE TABLE ProductImage
(
    productImageId INT IDENTITY (1, 1) PRIMARY KEY,
    name           VARCHAR(255) NOT NULL,
    description    VARCHAR(255),
    path           VARCHAR(255) NOT NULL,
    productId      INT          NOT NULL,
    constraint product_productImage_fk FOREIGN KEY (productId) REFERENCES Product (productId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- MESSAGING SYSTEM
CREATE TABLE MessageList
(
    messageListId     INT IDENTITY (1, 1) PRIMARY KEY,
    message           VARCHAR(255) NOT NULL,
    timestamp         DATETIME     NOT NULL DEFAULT (GETDATE()),
    adminId           INT,
    customerId        INT,
    businessId        INT,
    deliveryServiceId INT,
    deliveryPersonId  INT,
    customerOrderId   INT          NOT NULL,
    constraint customerOrder_messageList_fk FOREIGN KEY (customerOrderId) REFERENCES CustomerOrder (customerOrderId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Payment methods
CREATE TABLE PaymentMethod
(
    paymentMethodId      INT IDENTITY (1, 1) PRIMARY KEY,
    name                 VARCHAR(255) NOT NULL,
    cardNumber           VARCHAR(255) NOT NULL,
    billingCountry       VARCHAR(255) NOT NULL,
    billingPostalCode    VARCHAR(255) NOT NULL,
    billingCity          VARCHAR(255) NOT NULL,
    billingStreet        VARCHAR(255) NOT NULL,
    defaultPaymentMethod BIT          NOT NULL DEFAULT (0),
    customerId           INT,

    constraint customerId_paymentMethod_fk FOREIGN KEY (customerId) REFERENCES Customer (customerId)
        ON DELETE CASCADE ON UPDATE CASCADE
);