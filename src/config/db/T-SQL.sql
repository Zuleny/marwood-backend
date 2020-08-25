/**
* objetive: get quantity of privileges of a specific rol
* test: select get_quantity_privileges(cast(2 as smallint));
*/
create or replace function get_quantity_privileges(id_role_i smallint) returns smallint as
$BODY$
    declare quantity_privileges integer = (select count(*) from role_privilege where id_role = id_role_i);
begin
	return quantity_privileges;
end  
$BODY$ language plpgsql;

/**
* objetive: get quantity of products of a specific category
* test: select get_quantity_product_of_a_category(3);
*/

create or replace function get_quantity_product_of_a_category(id_category_i integer) returns integer as
$BODY$
    declare quantity_products integer = (select count(*) from product p where id_category = id_category_i );
begin
	return quantity_products;
end  
$BODY$ language plpgsql;

create or replace function register_invoice(order_no integer, id_user_r integer)returns integer as 
$BODY$
declare nit_ci_g integer = (select s.nit_ci from shipping s, "order" o where o.id_shipping=s.id_shipping and o.nro_order=order_no);
		bussiness text = (select s.business_name from shipping s, "order" o where o.id_shipping=s.id_shipping and o.nro_order=order_no);
		cost_total_r decimal(12,2) = (select sum(p.price*sc.quantity) from shopping_cart sc, product p, product_category pc, "order" o where sc.cod_product=p.cod_product and p.id_category=sc.id_category and p.id_category=pc.id_category and sc.nro_order=o.nro_order and o.nro_order=order_no group by o.nro_order);
		nro integer;
begin
	insert into invoice(nit_ci, business_name, "date", total_cost, nro_order, id_user) values (nit_ci_g, bussiness, cast(now() as date), cost_total_r, order_no, id_user_r)returning nro_invoice into nro;
	return nro;
end $BODY$ language plpgsql;