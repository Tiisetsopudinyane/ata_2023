CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY,
        brandName TEXT NOT NULL,
        images BLOB
    );

    delete from photos where brandName="logo";

    select * from photos where brandName="bbc-black" order by brandName;