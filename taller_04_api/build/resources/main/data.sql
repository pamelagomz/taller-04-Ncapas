INSERT INTO rol (code, name) VALUES ('PATN','Patient') ON CONFLICT DO NOTHING;
INSERT INTO rol (code, name) VALUES ('DOCT','Doctor') ON CONFLICT DO NOTHING;
INSERT INTO rol (code, name) VALUES ('ASST','Assistant') ON CONFLICT DO NOTHING;
INSERT INTO rol (code, name) VALUES ('ADMN','Admin') ON CONFLICT DO NOTHING;
INSERT INTO rol (code, name) VALUES ('USER','User') ON CONFLICT DO NOTHING;

INSERT INTO specialization (id, code, name) VALUES ('7a7b57ba-006b-4fb8-bb92-bb67ff2132c2','GENR','General') ON CONFLICT DO NOTHING;
INSERT INTO specialization (id, code, name) VALUES ('fbe82e65-afcc-4a9c-9eb7-6c537c8816f9','CARD','Cardiologo') ON CONFLICT DO NOTHING;
