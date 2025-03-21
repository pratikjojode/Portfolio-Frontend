import React, { useState } from "react";
import { Modal, Card, Row, Col, Tabs } from "antd";
import Layout from "../components/Layout";
import exel from "../images/exel.jpg";
import prodigy from "../images/Letter of Recommendation_page-0001.jpg";
import prodigy2 from "../images/Certificate_page-0001.jpg";
import prodigy3 from "../images/Offer Letter-1.png";
import zidio from "../images/1730267813030.jpg";
import zidio1 from "../images/1730267813162.jpg";
import greatLearnig from "../images/html image.jpg";
import tableau from "../images/1713976379099.jpg";
import cogni1 from "../images/PRATIK RAVINDRA JOJODE_page-0001.jpg";
import cogni2 from "../images/PRATIK_page-0001.jpg";
import "../styles/Certificates.css"; // Custom CSS for additional styling

const { TabPane } = Tabs;

const categories = {
  Certificates: [
    { id: 1, title: "Exel Certification", image: exel },
    { id: 2, title: "Prodigy Certificate", image: prodigy2 },
    { id: 3, title: "HTML & CSS Certificate", image: greatLearnig },
    { id: 4, title: "Tableau Certification", image: tableau },
  ],
  "Offer Letters": [
    { id: 5, title: "Prodigy Offer Letter", image: prodigy3 },
    { id: 6, title: "Zidio Internship Offer", image: zidio },
    { id: 7, title: "Zidio Offer Letter", image: zidio1 },
  ],
  "Other Documents": [
    { id: 8, title: "Letter of Recommendation", image: prodigy },
    { id: 9, title: "Cognify Recommendation", image: cogni1 },
    { id: 10, title: "Cognify Certificate", image: cogni2 },
  ],
};

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <Layout>
      <div className="certificates-container container-fluid py-5">
        {/* Tabs for categories */}
        <Tabs
          defaultActiveKey="Certificates"
          centered
          className="certificates-tabs"
        >
          {Object.entries(categories).map(([category, items]) => (
            <TabPane tab={category} key={category}>
              <Row gutter={[24, 24]} justify="center">
                {items.map((cert) => (
                  <Col key={cert.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      hoverable
                      className="certificate-card shadow-sm border-0"
                      cover={
                        <img
                          alt={cert.title}
                          src={cert.image}
                          className="certificate-image img-fluid rounded-top"
                        />
                      }
                      onClick={() => setSelectedCert(cert)}
                    >
                      <Card.Meta
                        title={
                          <h5 className="text-center font-weight-bold text-dark">
                            {cert.title}
                          </h5>
                        }
                        className="certificate-title"
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </TabPane>
          ))}
        </Tabs>

        {/* Modal to show full-size certificate */}
        {selectedCert && (
          <Modal
            open={true}
            title={
              <h4 className="font-weight-bold text-dark">
                {selectedCert.title}
              </h4>
            }
            footer={null}
            onCancel={() => setSelectedCert(null)}
            className="certificate-modal"
          >
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="certificate-modal-image img-fluid rounded"
            />
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default Certificates;
