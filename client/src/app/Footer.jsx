"use client";

import { Layout, Typography, Row, Col, Space } from "antd";
import { InstagramOutlined, WhatsAppOutlined, EnvironmentOutlined, LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
import styles from "@/ui/Footer.module.css"; // Asegurá la ruta correcta a tu archivo CSS
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const { Title, Paragraph, Text } = Typography;

export default function Footer() {
    const pathname=usePathname();

    const admin=useSelector(state=>state.user.admin);
   
    if(pathname==="/Perfil" && admin)return null;
    return (
        <Layout.Footer className={styles.footer}>
            <Row gutter={[24, 24]} justify="space-between" align="top">
                <Col xs={24} sm={12} md={8}>
                    <Title level={5} className={styles.footerTitle}>SIR GONZA</Title>
                    <Paragraph className={styles.footerText}>
                        Barbería & Peluquería Masculina.<br />
                    </Paragraph>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <Title level={5} className={styles.footerTitle}>HORARIOS</Title>
                    <Paragraph className={styles.footerText}>
                        Martes a Sábados: 10:00 a 20:00 hs.
                    </Paragraph>
                </Col>

                <Col xs={24} sm={24} md={8}>
                    <Title level={5} className={styles.footerTitle}>CONTACTO</Title>
                    <Space orientation="vertical" size="small">
                        <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                            <WhatsAppOutlined /> WhatsApp / Turnos
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                            <InstagramOutlined /> @sirgonza
                        </a>
                        <a href="https://maps.app.goo.gl/UpJ1KXq77wBW1EXU9" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                            <EnvironmentOutlined /> Namuncurá 872, B1882 Ezpeleta, Provincia de Buenos Aires
                        </a>
                    </Space>
                </Col>
            </Row>

            <Row 
                justify="space-between" /* Separa el copyright a la izquierda y tu firma a la derecha */
                align="middle"
                className={styles.footerBottomRow}
            >
                <Col xs={24} sm={12}>
                    <Text className={styles.footerCopy}>
                        © {new Date().getFullYear()} Sir Gonza. Todos los derechos reservados.
                    </Text>
                </Col>
  
                <Col xs={24} sm={12} className={styles.developerCol}>
                    <Space size="large" className={styles.devSpace}>
                        <Text className={styles.footerCopy}>
                            Desarrollado por Claudio Bernal
                            <a 
                                href="https://www.linkedin.com/in/claudio-andres-bernal-denis-148283234/"
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.devLink}
                            >
                                <LinkedinOutlined/>
                            </a>
                            <a 
                                href="https://github.com/ClaudioBe"
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={styles.devLink}
                            >
                                <GithubOutlined/>
                            </a>
                        </Text>  
                    </Space>
                </Col>
            </Row>
        </Layout.Footer>
  );
}
