-- them admin
INSERT INTO `user` (user_id, full_name, user_name, password, email, phone, is_verified, created_at, updated_at, verification_code)
VALUES (1000, 'admin', 'admin', '$2a$12$pewAFAB1wh0iGx48aTbygugky026QP2nEPVD7eE7zoNI5I0MohcEi', 'phutot1234@gmail.com','0348191483', 1, NOW(), NOW(), NULL);

-- them quyen han
insert into role (role_name)
values ("ADMIN"),
       ("USER");

-- them quyen admin cho tai khoan admin
insert into user_role (user_id, role_id)
values (1000, 1);

-- them tac gia
insert into author(author_name)
values ("Nhieu Tac Gia"),
       ("Chua Xac Dinh"),
       ("Kim Dong"),
       ("Nam Cao");

-- them nha cung cap
insert into publisher (publisher_name)
values ("Nha Xuat Ban Kim Dong"),
       ("Nha Xuat Ban Hai Ba Trung"),
       ("Nha Xuat Ban Kim Long");

-- them loai sach
insert into category (category_name)
values ("Sach Thieu Nhi"),
       ("Sach Van Hoc"),
       ("Sach Nghe Thuat");


-- then sach
insert into book (book_title, book_description, book_price, book_isbn, publisher_id)
values ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1),
       ("Dac Nhan Tam", "cuon sach nay se day ban ve nhung van de trong cuoc song doi thuong, cac van de giao tiep,...",
        200000, "2332434323442", 1);


-- them anh chinh cho sach
insert into book_image (book_image, is_primary, book_id)
values ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 1),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 2),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 3),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 4),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 5),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 6),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 7),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 8),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 9),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 10),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 11),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 12),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 13),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 14),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 15),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 16),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 17),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 18),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 19),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 20),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 21),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 22),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 1, 23);


-- them anh phu cho sach
insert
into book_image (book_image, is_primary, book_id)
values ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 1),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 2),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 3),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 4),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 5),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 6),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 7),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 8),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 9),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 10),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 11),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 12),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 13),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 14),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 15),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 16),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 17),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 18),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 19),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 20),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 21),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 22),
       ("https://cdn0.fahasa.com/media/catalog/product/b/_/b_a-1---_c-nh_n-t_m.jpg", 0, 23);


-- them tac gia cho sach
insert into book_author(book_id, author_id)
values (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 1),
       (7, 1),
       (8, 1),
       (9, 1),
       (10, 1),
       (11, 1),
       (12, 1),
       (13, 1),
       (14, 1),
       (15, 1),
       (16, 1),
       (17, 1),
       (18, 1),
       (19, 1),
       (20, 1),
       (21, 1),
       (22, 1),
       (23, 1);


-- them the loai sach cho sach
insert
into book_category(book_id, category_id)
values (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 1),
       (7, 1),
       (8, 1),
       (9, 1),
       (10, 1),
       (11, 1),
       (12, 1),
       (13, 1),
       (14, 1),
       (15, 1),
       (16, 1),
       (17, 1),
       (18, 1),
       (19, 1),
       (20, 1),
       (21, 1),
       (22, 1),
       (23, 1);

-- cac tinh thanh pho tren ca nuoc
insert into province(province_name)
values ("Thành phố Cần Thơ");

-- can tho
insert into district(district_name, province_id) values
("Huyện Cờ Đỏ", 1),
("Huyện Phong Điền", 1),
("Huyện Thới Lai", 1),
("Huyện Vĩnh Thạnh", 1),
("Quận Bình Thuỷ", 1),
("Quận Cái Răng", 1),
("Quận Ninh Kiều", 1),
("Quận Ô Môn", 1),
("Quận Thốt Nốt", 1);


-- can tho - huyen co do
insert into ward(ward_name, district_id) values
("Thị trấn Cờ Đỏ", 1),
("Xã Đông Hiệp", 1),
("Xã Đông Thắng", 1),
("Xã Thạnh Phú", 1),
("Xã Thới Đông", 1),
("Xã Thới Hưng", 1),
("Xã Thới Xuân", 1),
("Xã Trung An", 1),
("Xã Trung Hưng", 1),
("Xã Trung Thạnh", 1);

-- can tho - huyen phong dien
insert into ward(ward_name, district_id) values
("Thị trấn Phong Điền", 2),
("Xã Giai Xuân", 2),
("Xã Mỹ Khánh", 2),
("Xã Nhơn Ái", 2),
("Xã Nhơn Nghĩa", 2),
("Xã Tân Thới", 2),
("Xã Trường Long", 2);


-- can tho - huyen thoi lai
insert into ward(ward_name, district_id) values
("Thị trấn Thới Lai", 3),
("Xã Định Môn", 3),
("Xã Đông Bình", 3),
("Xã Đông Thuận", 3),
("Xã Tân Thạnh", 3),
("Xã Thới Tân", 3),
("Xã Thới Thạnh", 3),
("Xã Trường Thành", 3),
("Xã Trường Thắng", 3),
("Xã Trường Xuân", 3),
("Xã Trường Xuân A", 3),
("Xã Trường Xuân B", 3),
("Xã Xuân Thắng", 3);


-- can tho - huyen vinh thanh
insert into ward(ward_name, district_id) values
("Thị trấn Thanh An", 4),
("Thị trấn Vĩnh Thạnh", 4),
("Xã Thạnh An", 4),
("Xã Thạnh Lộc", 4),
("Xã Thạnh Lợi", 4),
("Xã Thạnh Mỹ", 4),
("Xã Thạnh Qưới", 4),
("Xã Thạnh Thắng", 4),
("Xã Thạnh Tiến", 4),
("Xã Vĩnh Bình", 4),
("Xã Vĩnh Trinh", 4);


-- can tho - quan binh thuy
insert into ward(ward_name, district_id) values
("Phường An Thới", 5),
("Phường Bình Thủy", 5),
("Phường Bùi Hữu Nghĩa", 5),
("Phường Long Hòa", 5),
("Phường Long Tuyền", 5),
("Phường Thới An Đông", 5),
("Phường Trà An", 5),
("Phường Trà Nóc", 5);


-- can tho - quan cai rang
insert into ward(ward_name, district_id) values
("Phường Ba Láng", 6),
("Phường Hưng Phú", 6),
("Phường Hưng Thạnh", 6),
("Phường Lê Bình", 6),
("Phường Phú Thứ", 6),
("Phường Tân Phú", 6),
("Phường Thường Thạnh", 6);



-- can tho - quan minh kieu
insert into ward(ward_name, district_id) values
("Phường An Bình", 7),
("Phường An Cư", 7),
("Phường An Hòa", 7),
("Phường An Hội", 7),
("Phường An Khánh", 7),
("Phường An Lạc", 7),
("Phường An Nghiệp", 7),
("Phường An Phú", 7),
("Phường Cái Khế", 7),
("Phường Hưng Lợi", 7),
("Phường Tân An", 7),
("Phường Thới Bình", 7),
("Phường Xuân Khánh", 7);


-- can tho - quan o mon
insert into ward(ward_name, district_id) values
("Phường Châu Văn Liêm", 8),
("Phường Long Hưng", 8),
("Phường Phước Thới", 8),
("Phường Thới An", 8),
("Phường Thới Hòa", 8),
("Phường Thới Long", 8),
("Phường Trường Lạc", 8);


-- can tho - quan thot not
insert into ward(ward_name, district_id) values
("Phường Tân Hưng", 9),
("Phường Tân Lộc", 9),
("Phường Thạnh Hoà", 9),
("Phường Thốt Nốt", 9),
("Phường Thới Thuận", 9),
("Phường Thuận An", 9),
("Phường Thuận Hưng", 9),
("Phường Trung Kiên", 9),
("Phường Trung Nhứt", 9);
