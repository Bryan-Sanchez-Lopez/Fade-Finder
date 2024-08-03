drop database fadefinder;
create database fadeFinder;
use fadeFinder;

create table roles(
rol_id int not null auto_increment unique primary key,
nombre varchar(100) not null
);

create table usuarios (
usuario_id int primary key auto_increment not null unique,
nombre varchar(50) not null,
telefono varchar(10),
email varchar(100) not null,
password varchar(100) not null,
status char(1) not null,
rol_id int not null,
foreign key (rol_id) references roles (rol_id)
);


create table horarios(
horario_id int not null auto_increment primary key unique,
barbero_id int not null,
fecha varchar(100) not null,
status char(1) not null default "0",
foreign key (barbero_id) references usuarios (usuario_id)
);

create table citas(
cita_id int not null auto_increment primary key unique,
usuario_id int not null,
barbero_id int not null,
horario_id int not null,
status char(1) not null,
foreign key (usuario_id) references usuarios (usuario_id),
foreign key (barbero_id) references usuarios (usuario_id),
foreign key (horario_id) references horarios (horario_id)
);

insert into roles values (1, "usuario");
insert into roles values (2, "barbero");
insert into roles values (3, "administrador");

insert into usuarios values (1, "Carlos", "4291223345", "carlos@gmail.com", "carlos", "1", 2);
insert into usuarios values (3, "Roberto", "4291223345", "roberto@gmail.com", "roberto", "1", 2);


insert into horarios values(1, 1, "10am - 11am", "0");
insert into horarios values(2, 1, "11am - 12pm", "0");
insert into horarios values(3, 1, "1pm - 2pm", "0");
insert into horarios values(4, 1, "2pm - 3pm", "0");
insert into horarios values(5, 1, "3pm - 4pm", "0");

select * from citas;