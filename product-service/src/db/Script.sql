create extension if not exists "uuid-ossp";

create table product (
 id uuid primary key default uuid_generate_v4(),
 title text not null,
 price integer,
 description text
);

create table stock (
 product_id uuid,
 count integer,
 foreign key ("product_id") references "product" ("id")
);


WITH product as (
    insert into product (title, price, description) values
    ('Invisible Man', 420, 'The nameless narrator of the novel describes growing up in a black community in the South...'),
    ('The life before her eyes', 270, 'Diana stands before the mirror preening with her best friend, Maureen. Suddenly, a classmate enters holding a gun...'),
    ('Things Fall Apart', 300, 'It�s the ideal postcolonial novel.'),
    ('The God of Small Things', 500, 'The God of Small Things � though a fairly recent book � it explores caste, sexism, colonialism and the strange unspoken rules that tie Indian families together.'),
    ('Beloved', 100, 'Brutal, heartbreaking and beautiful.'),
    ('The Handmaid�s Tale', 300, 'Despite the passage of time, I have not forgotten how prescient The Handmaid�s Tale was, and how prescient it felt.'),
    ('Blood Meridian', 400, 'McCarthy is certainly one of the finest living authors in the world today and this novel is his best...'),
    ('A Fine Balance', 320, 'This is the one book that whisked me away to India.')

        returning id, title
)
insert into stock (product_id, count) values
((select product.id from product where product.title = 'Invisible Man'), 43),
((select product.id from product where product.title = 'The life before her eyes'), 18),
((select product.id from product where product.title = 'Things Fall Apart'), 1),
((select product.id from product where product.title = 'The God of Small Things'), 5),
((select product.id from product where product.title = 'Beloved'), 38),
((select product.id from product where product.title = 'The Handmaid�s Tale'), 2),
((select product.id from product where product.title = 'Blood Meridian'), 19),
((select product.id from product where product.title = 'A Fine Balance'), 10);


select * from product join stock on product.id=stock.product_id;
select * from product join stock on product.id=stock.product_id where product.id='23f6aed5-6c50-405d-8921-1a1a3de0f1da';

drop table stock;
drop table product;
