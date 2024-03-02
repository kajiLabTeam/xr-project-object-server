\c general_purpose_server;

CREATE TYPE location_type_enum AS ENUM ('indoor', 'outdoor');

-- applicationsテーブルにVARCHAR(26)をPrimary Keyとしてサンプルデータを挿入
CREATE TABLE applications (
    id VARCHAR(26) PRIMARY KEY,
    secret_key VARCHAR(40) CHECK (secret_key ~ '^[A-Za-z0-9+/]+$'),
    application_name VARCHAR(50) NOT NULL,
    representative_name VARCHAR(50) NOT NULL,
    corporate_name VARCHAR(100) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    address VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- usersテーブルにVARCHAR(26)をPrimary Keyとしてサンプルデータを挿入
CREATE TABLE users (
    id VARCHAR(26) PRIMARY KEY,
    name VARCHAR(50),
    mail VARCHAR(255),
    gender VARCHAR(10),
    age INT,
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2),
    address VARCHAR(255),
    occupation VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    application_id VARCHAR(26) REFERENCES applications(id)
);

-- spotsテーブルにVARCHAR(26)をPrimary Keyとしてサンプルデータを挿入
CREATE TABLE spots (
    id VARCHAR(26) PRIMARY KEY,
    name VARCHAR(50),
    floor INT,
    location_type location_type_enum,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- objectsテーブルにVARCHAR(26)をPrimary Keyとしてサンプルデータを挿入
CREATE TABLE objects (
    id VARCHAR(26) PRIMARY KEY,
    extension VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    deleted_at TIMESTAMP WITH TIME ZONE,
    user_id VARCHAR(26) REFERENCES users(id),
    spot_id VARCHAR(26) REFERENCES spots(id)
);

-- object_browsing_logsテーブルにVARCHAR(26)をPrimary Keyとしてサンプルデータを挿入
CREATE TABLE object_browsing_logs (
    id VARCHAR(26) PRIMARY KEY,
    reading_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(26) REFERENCES users(id),
    object_id VARCHAR(26) REFERENCES objects(id)
);