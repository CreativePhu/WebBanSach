-- them admin
INSERT INTO `user` (user_id, full_name, user_name, password, email, phone, is_verified, created_at, updated_at,verification_code) VALUES
(1000, 'admin', 'admin', '$2a$12$pewAFAB1wh0iGx48aTbygugky026QP2nEPVD7eE7zoNI5I0MohcEi', 'phutot1234@gmail.com','0348191483', 1, NOW(), NOW(), NULL);

-- them quyen admin cho tai khoan admin
insert into user_role (user_id, role_id) values
(1000, 1);