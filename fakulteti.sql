--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-11-01 19:43:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'WIN1250';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 33223)
-- Name: fakultet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fakultet (
    ime character varying(50) NOT NULL,
    adresa character varying(100) NOT NULL,
    dekan character varying(50) NOT NULL,
    eadresa character varying(100) NOT NULL,
    faks character varying(20) NOT NULL,
    telefon character varying(20) NOT NULL,
    webadresa character varying(50) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.fakultet OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 33222)
-- Name: fakultet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fakultet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fakultet_id_seq OWNER TO postgres;

--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 209
-- Name: fakultet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fakultet_id_seq OWNED BY public.fakultet.id;


--
-- TOC entry 211 (class 1259 OID 33244)
-- Name: smjer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.smjer (
    imestudija character varying(100) NOT NULL,
    razinastudija character varying(50) NOT NULL,
    brojsemestara integer NOT NULL,
    nacinizvedbe character varying(20) NOT NULL,
    akgodina integer NOT NULL,
    fakultetid integer NOT NULL
);


ALTER TABLE public.smjer OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 33276)
-- Name: fakultetsmjercsv; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.fakultetsmjercsv AS
 SELECT fakultet.ime,
    fakultet.adresa,
    fakultet.dekan,
    fakultet.eadresa,
    fakultet.faks,
    fakultet.telefon,
    fakultet.webadresa,
    fakultet.id,
    smjer.imestudija,
    smjer.razinastudija,
    smjer.brojsemestara,
    smjer.nacinizvedbe,
    smjer.akgodina,
    smjer.fakultetid
   FROM (public.fakultet
     LEFT JOIN public.smjer ON ((fakultet.id = smjer.fakultetid)));


ALTER TABLE public.fakultetsmjercsv OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 33272)
-- Name: fakultetsmjerjson; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.fakultetsmjerjson AS
 SELECT fakultet.ime,
    fakultet.adresa,
    fakultet.dekan,
    fakultet.eadresa,
    fakultet.faks,
    fakultet.telefon,
    fakultet.webadresa,
    fakultet.id,
    ( SELECT json_agg(row_to_json(smjer.*)) AS json_agg
           FROM public.smjer
          WHERE (fakultet.id = smjer.fakultetid)) AS studiji
   FROM public.fakultet;


ALTER TABLE public.fakultetsmjerjson OWNER TO postgres;

--
-- TOC entry 3176 (class 2604 OID 33226)
-- Name: fakultet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fakultet ALTER COLUMN id SET DEFAULT nextval('public.fakultet_id_seq'::regclass);


--
-- TOC entry 3324 (class 0 OID 33223)
-- Dependencies: 210
-- Data for Name: fakultet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fakultet (ime, adresa, dekan, eadresa, faks, telefon, webadresa, id) FROM stdin;
Fakultet elektrotehnike i raèunarstva	Unska 3, 10000 Zagreb	prof. dr. sc. Vedran Bilas	dekanat@fer.hr	+385 1 617 00 07	+385 1 612 99 99	www.fer.unizg.hr	1
Agronomski fakultet	Svetošimunska 25, 10000 Zagreb	prof. dr. sc. Ivica Kisiæ	dekanat@agr.hr	+385 1 231 53 00	+385 1 239 37 77	www.agr.unizg.hr	2
Arhitektonski fakultet	Fra Andrije Kaèiæa Miošiæa 26, 10000 Zagreb	prof. dr. sc. Bojan Baletiæ	dekan@arhitekt.hr	+385 1 463 98 10	+385 1 463 92 22	www.arhitekt.unizg.hr	3
Ekonomski fakultet	Kennedyjev trg 6, 10000 Zagreb	izv. prof. dr. sc. Sanja Sever Mališ	dean@efzg.hr	+385 1 230 84 72	+385 1 238 33 33	www.efzg.unizg.hr	4
Fakultet strojarstva i brodogradnje	Ivana Luèiæa 5, 10000 Zagreb	prof. dr. sc. Zdenko Tonkoviæ	fsb@fsb.hr	+385 1 615 69 40	+385 1 616 82 22	www.fsb.unizg.hr	5
Fakultet organizacije i informatike	Pavlinska 2, 42000 Varaždin	prof. dr. sc. Nina Begièeviæ Reðep	ured-dekana@foi.hr	+385 42 213 413	+385 42 390 800	www.foi.unizg.hr	6
Farmaceutsko-biokemijski fakultet	Ante Kovaèiæa 1, 10000 Zagreb	izv. prof. dr. sc. Jasmina Lovriæ	dekanat@pharma.hr	+385 1 639 44 00	+385 1 481 82 88	www.pharma.unizg.hr	7
Geodetski fakultet	Kaèiæeva 26, 10000 Zagreb	izv. prof. dr. sc. Almin Ðapo	dekan@geof.hr	+385 1 482 80 81	+385 1 463 92 22	www.geof.unizg.hr	8
Graðevinski fakultet	Fra Andrije Kaèiæa Miošiæa 26, 10000 Zagreb	izv. prof. dr. sc. Domagoj Damjanoviæ	ured_dekana@grad.hr	+385 1 463 92 06	+385 1 463 92 22	www.grad.unizg.hr	9
Kineziološki fakultet	Horvaæanski zavoj 15, 10000 Zagreb	izv. prof. dr. sc. Mario Baiæ	dekanat@kif.hr	+385 1 363 41 46	+385 1 365 86 66	www.kif.unizg.hr	10
\.


--
-- TOC entry 3325 (class 0 OID 33244)
-- Dependencies: 211
-- Data for Name: smjer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.smjer (imestudija, razinastudija, brojsemestara, nacinizvedbe, akgodina, fakultetid) FROM stdin;
Elektrotehnika i informacijska tehnologija i Raèunarstvo	preddiplomski	6	redovan	2022	1
Raèunarstvo	diplomski	4	redovan	2022	1
Agrarna ekonomika	preddiplomski	6	redovan	2022	2
Animalne znanosti	preddiplomski	6	redovan	2022	2
Hortikultura	diplomski	4	redovan	2022	2
Arhitektura i urbanizam	diplomski	4	redovan	2022	3
Arhitektura i urbanizam	preddiplomski	6	redovan	2022	3
Dizajn	preddiplomski	6	redovan	2022	3
Poduzetništvo	preddiplomski	6	izvanredni	2022	4
Poslovna ekonomija	diplomski	2	redovan	2022	4
Brodogradnja	preddiplomski	6	redovan	2022	5
Strojarstvo	preddiplomski	6	redovan	2022	5
Strojarstvo	diplomski	4	redovan	2022	5
Informatika u obrazovanju	diplomski	4	redovan	2022	6
Informacijski i poslovni sustavi	preddiplomski	6	redovan	2022	6
Informacijski i poslovni sustavi	preddiplomski	6	izvanredni	2022	6
Farmacija	integrirani preddiplomski i diplomski sveuèilišni	10	redovan	2022	7
Medicinska biokemija	integrirani preddiplomski i diplomski sveuèilišni	10	redovan	2022	7
Geodezija i geoinformatika	preddiplomski	6	redovan	2022	8
Geodezija i geoinformatika	diplomski	4	redovan	2022	8
Graðevinarstvo	preddiplomski	6	redovan	2022	9
Graðevinarstvo	diplomski	4	redovan	2022	9
Kineziologija	integrirani preddiplomski i diplomski sveuèilišni	10	redovan	2022	10
Kineziologija	poslijediplomski doktorski sveuèilišni	6	izvanredni	2022	10
Ekonomija	preddiplomski	8	redovan	2022	4
\.


--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 209
-- Name: fakultet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fakultet_id_seq', 10, true);


--
-- TOC entry 3178 (class 2606 OID 33228)
-- Name: fakultet fakultet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fakultet
    ADD CONSTRAINT fakultet_pkey PRIMARY KEY (id);


--
-- TOC entry 3180 (class 2606 OID 33255)
-- Name: smjer smjer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.smjer
    ADD CONSTRAINT smjer_pkey PRIMARY KEY (fakultetid, imestudija, razinastudija, nacinizvedbe);


--
-- TOC entry 3181 (class 2606 OID 33249)
-- Name: smjer smjer_fakultetid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.smjer
    ADD CONSTRAINT smjer_fakultetid_fkey FOREIGN KEY (fakultetid) REFERENCES public.fakultet(id);


-- Completed on 2022-11-01 19:43:53

--
-- PostgreSQL database dump complete
--

