"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
    Layout,
    Typography,
    Row,
    Col,
    Card,
    Button,
    Flex,
    Space
} from "antd";

import {
    CalendarOutlined,
    BellOutlined,
    UserOutlined,
} from "@ant-design/icons";

import styles from "@/ui/page.module.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
    const router = useRouter();
    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>
                <Flex
                    vertical
                    align="center"
                    justify="center"
                    gap="large"
                    className={styles.hero}
                >
                    <Image
                        src="/assets/icon.png"
                        alt="Logo"
                        width={180}
                        height={180}
                        className={styles.logo}
                    />

                    <Space
                        orientation ="vertical"
                        size="middle"
                        align="center"
                    >

                        <Title className={styles.title}>
                            Reserva tu turno en segundos
                        </Title>

                        <Paragraph className={styles.subtitle}>
                            Solicitá un turno de forma rápida y sencilla.
                        </Paragraph>
                    </Space>

                    <Button
                        size="large"
                        className={styles.button}
                        onClick={() => router.push("/Turnos")}
                    >
                        SACAR TURNO
                    </Button>

                </Flex>

                <Flex
                    vertical
                    align="center"
                    gap="large"
                    className={styles.cta}
                >

                    <Title level={3} className={styles.subtitle}>
                        ¿Todavía no tenés cuenta?
                    </Title>

                    <Button
                        size="large"
                        className={styles.button}
                        onClick={() => router.push("/Registrarse")}
                    >
                        REGISTRATE
                    </Button>
                    <Title level={3} className={styles.subtitle}>
                        Y accedé a los siguientes beneficios:
                    </Title>

                </Flex>
                {/* BENEFICIOS */}

                <Row
                    gutter={[24, 24]}
                    className={styles.cardsSection}
                >

                    <Col xs={24} md={8} style={{display:"flex"}}>

                        <Card
                            hoverable
                            className={styles.card}
                        >

                            <Flex
                                vertical
                                align="center"
                                gap="middle"
                            >

                                <UserOutlined className={styles.icon} />

                                <Title level={4} className={styles.subtitle}>
                                    Datos guardados
                                </Title>

                                <Paragraph className={styles.subtitle}>
                                    Registrate una sola vez y olvidate de
                                    completar formularios.
                                </Paragraph>

                            </Flex>

                        </Card>

                    </Col>

                    <Col xs={24} md={8} style={{display:"flex"}}>

                        <Card
                            hoverable
                            className={styles.card}
                        >

                            <Flex
                                vertical
                                align="center"
                                gap="middle"
                            >

                                <CalendarOutlined className={styles.icon} />

                                <Title level={4} className={styles.subtitle}>
                                    Agilidad
                                </Title>

                                <Paragraph className={styles.subtitle}>
                                    Elegí tu horario y solicitá tu turno
                                    en segundos.
                                </Paragraph>

                            </Flex>

                        </Card>

                    </Col>

                    <Col xs={24} md={8} style={{display:"flex"}}>

                        <Card
                            hoverable
                            className={styles.card}
                        >

                            <Flex
                                vertical
                                align="center"
                                gap="middle"
                            >

                                <BellOutlined className={styles.icon} />

                                <Title level={4} className={styles.subtitle}>
                                    Notificaciones
                                </Title>

                                <Paragraph className={styles.subtitle}>
                                    Recibí notificaciones cuando se acepte tu solicitud.
                                </Paragraph>

                            </Flex>

                        </Card>

                    </Col>

                </Row>

            </Content>

        </Layout>
    );
};

export default Home;