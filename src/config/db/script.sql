CREATE ROLE mara
	WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	REPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'mara11235813';
	
CREATE DATABASE mara
	with owner = mara 
	encoding='UTF8'
	tablespace=pg_default
	CONNECTION LIMIT=-1;
	
	
create table privilege (
	id_privilege smallserial primary key,
	description_privilege text not null
);


create table "role" (
	id_role smallserial primary key,
	role_name varchar(30) not null,
	description text not null,
	enable boolean not null --enable=true -> role is enable, if enable=false role is "deleted"
);

create table role_privilege (
	id_role smallint not null references "role"(id_role)
	on update cascade on delete cascade,
	id_privilege smallint not null references privilege(id_privilege)
	on update cascade on delete cascade,
	primary key (id_role, id_privilege)
);

create table "user" (
	id_user serial primary key,
	username varchar(50) not null,
	email text not null,
	password text not null,
	enable boolean not null, --enable=true -> user is enable, if enable=false user is "deleted"
	type boolean not null, --type = true ->client , type = false = admin
	id_role smallint not null references "role"(id_role)
	on update cascade on delete cascade
);

create table warehouse (
	cod_warehouse smallserial primary key,
	name varchar(20) not null,
	address text not null
);


create table product_category(
	id_category serial primary key,
	name varchar(20) not null,
	description_category text not null,
	enable boolean not null
);

create table product (
    id_category integer not null,
    cod_product serial not null,
    name varchar(40) not null,
    description varchar(100) not null,
    measure varchar(32),
    material varchar(15),
    wood_color varchar(10),
    price decimal(12,2) not null,
    availability boolean not null,
    foreign key(id_category) references product_category(id_category)
    on update cascade on delete cascade,
    primary key(id_category, cod_product)
);

create table product_image(
    image_name text not null primary key,
    id_category integer not null,
    cod_product integer not null,
    foreign key(id_category , cod_product) references product(id_category, cod_product)
    on update cascade on delete cascade
);
create table warehouse_inventory (
	cod_warehouse smallint not null references warehouse
	on update cascade on delete cascade,
	cod_product integer not null,
	id_category integer not null,
	foreign key (cod_product, id_category) references product(cod_product , id_category)
	on update cascade on delete cascade,
	stock decimal(12,2) not null,
	primary key (cod_warehouse, cod_product, id_category)
);

create table coupon(
    cod_coupon serial not null primary key,
    discount smallint not null,
    start_date date not null,
    end_date date not null
);


create table payment_method(
    id_payment_method smallint not null primary key,
    name varchar(30) not null,
    description varchar(50)
);

create table delivery_area(
    id smallserial not null primary key,
    country varchar(50) not null,
    departament varchar(50) not null,
    province varchar(50),
    price_delivery_area decimal(12,2)
);

create table shipping(
    id_shipping serial not null primary key,
    name_client varchar(30) not null,
    phone_number varchar(15),
    email varchar(30),
    departament varchar(50) not null,
    address text not null,
    business_name varchar(50),
    nit_ci integer not null,
    id_delivery_area smallint not null references delivery_area(id)
    on update cascade on delete cascade    
);


create table "order"(
    nro_order serial not null primary key,
    date date not null,
    state smallint not null, --0 cancelado, 1 finalizado, 2 en espera
    total_shopping_cart decimal(12,2) not null,
    id_user integer not null references "user"(id_user)
    on update cascade on delete cascade,
    cod_coupon integer not null references coupon(cod_coupon)
    on update cascade on delete cascade,
    id_shipping integer not null references shipping(id_shipping)
    on update cascade on delete cascade,
    id_payment_method smallint not null references payment_method(id_payment_method)
    on update cascade on delete cascade
);

create table invoice(
    nro_invoice serial not null primary key,
    nro_authorization serial not null,
    nit_ci integer not null,
    business_name varchar(50),
    date date not null,
    total_cost decimal(12,2) not null,
    nro_order integer not null references "order"(nro_order)
    on update cascade on delete cascade,
    id_user integer not null references "user"(id_user)
    on update cascade on delete cascade
);

create table shopping_cart(
    id_category integer not null,
    cod_product integer not null,
    nro_order integer not null references "order"(nro_order)
    on update cascade on delete cascade,
    quantity decimal(12,2) not null,
    foreign key(id_category , cod_product) references product(id_category, cod_product)
    on update cascade on delete cascade,
    primary key(id_category , cod_product,nro_order)
);


--poblation

insert into privilege(description_privilege) values('admin privilege');
insert into privilege(description_privilege) values('admin role privilege');
insert into privilege(description_privilege) values('admin role');
insert into privilege(description_privilege) values('admin user');
insert into privilege(description_privilege) values('admin product category');
insert into privilege(description_privilege) values('admin product');
insert into privilege(description_privilege) values('admin product image');
insert into privilege(description_privilege) values('admin warehouse');
insert into privilege(description_privilege) values('admin warehouse inventory');
insert into privilege(description_privilege) values('admin coupon');
insert into privilege(description_privilege) values('read coupon');
insert into privilege(description_privilege) values('admin payment method');
insert into privilege(description_privilege) values('read payment method');
insert into privilege(description_privilege) values('admin delivery area');
insert into privilege(description_privilege) values('read delivery area');
insert into privilege(description_privilege) values('admin shipping');
insert into privilege(description_privilege) values('admin order');
insert into privilege(description_privilege) values('admin invoice');
insert into privilege(description_privilege) values('admin shopping cart');

insert into "role" (role_name , description ,"enable" ) values('Admin','Administrator of e-commerce',true);
insert into "role" (role_name , description ,"enable" ) values('Client','Client of e-commerce',true);

insert into role_privilege (id_role ,id_privilege ) values
                           (1,1),
                           (1,2),
                           (1,3),
                           (1,4),
                           (1,5),
                           (1,6),
                           (1,7),
                           (1,8),
                           (1,9),
                           (1,10),
                           (1,11),
                           (1,12),
                           (1,13),
                           (1,14),
                           (1,15),
                           (1,16),
                           (1,17),
                           (1,18),
                           (1,19),
                           (2,4),
                           (2,11),
                           (2,13),
                           (2,15),
                           (2,16),
                           (2,17),
                           (2,18),
                           (2,19);
            
insert into "user" (username ,email ,password ,"enable" ,"type" ,id_role )values
                   ('admin','zuleny.cr@gmail.com','123456',true,false,1),
                   ('client','zuleny.cr@gmail.com','654321',true,true,2);
                 
insert into warehouse ("name" ,address ) values
                      ('warehouse1','Av Always Life'),
                      ('warehouse2','Av Always Die');
                     
insert into product_category ("name" ,description_category ,"enable" ) values
                             ('Dormitorio','Todo sobre dormitorio',true),
                             ('Living','Todo sobre living',true),
                             ('Vitrinas','Todo sobre vitrinas',true);
                            
insert into product (id_category ,"name" ,description ,measure ,material ,wood_color ,price ,availability ) values
                    (1,'Sofa1','Mueble compuesto de 3 muebles','2mx60cmx50cm','madera','madera',8000.5,true),
                    (2,'Cama1','Mueble compuesto de una cama 1 2 tocadores','2mx2mx40cm','madera','madera',10050.7,true),
                    (3,'Vitrina1','Mueble compuesto de 1 muebles','2.5mx60cmx50cm','madera','mara',5023.4,true);
                    
insert into product_image (image_name ,id_category ,cod_product ) values
                          ('a.jpg',1,1),
                          ('b.jpg',2,2),
                          ('c.png',3,3);
                          
insert into warehouse_inventory (cod_warehouse ,cod_product ,id_category ,stock ) values
                                (1,1,1,3),
                                (1,2,2,4),
                                (2,3,3,12);
                                
insert into coupon (discount ,start_date ,end_date ) values
                   (5,'01/08/2020','01/09/2020'),
                   (10,'01/08/2020','01/09/2020');
                   
insert into payment_method (id_payment_method ,"name" ,description ) values
                           (50,'metodo1','Pago atraves del metodo1'),
                           (51,'metodo2','Pago atraves del metodo2');
                           
insert into delivery_area (country ,departament ,province ,price_delivery_area ) values
                          ('Bolivia','Santa Cruz','Andres Ibañez', 400),
                          ('Bolivia','La Paz','Murillo', 800);
                          
insert into shipping (name_client ,phone_number, email ,departament ,address ,business_name ,nit_ci ,id_delivery_area ) values 
                     ('dell','72561333','dell@gmail.com','santa cruz','Avenida siempre vivas nro 123','venta de computadores',38920274,1),
                     ('hp','72561332','hp@gmail.com','la paz','Avenida murillo nro 123','venta de computadores',38920275,2);
                    
insert into "order" ("date" ,state ,total_shopping_cart ,id_user ,cod_coupon ,id_shipping ,id_payment_method ) values 
                    ('01/08/2020',1,10010.5,2,1,1,50),
                    ('31/07/2020',2,10010.5,2,2,2,51);
                   
insert into invoice (nit_ci ,business_name ,"date" ,total_cost ,nro_order ,id_user ) values
                    (1323373,'venta de coputadores','1/08/2020',12400,1,1),
                    (1323375,'venta de coputadores','1/08/2020',10300,2,2);
                   
insert into shopping_cart (id_category ,cod_product ,nro_order ,quantity ) values 
                          (1,1,1,1),
                          (2,2,2,1);