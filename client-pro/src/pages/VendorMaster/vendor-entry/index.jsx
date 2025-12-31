import React from 'react';
import { Card, Col, DatePicker, Row, Tabs ,Form, message  } from 'antd';
import { Column } from '@ant-design/charts';

import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { save } from '../service';
import styles from './style.less';
const { TabPane } = Tabs;


const EntryForm = (props) => {


  const [form] = Form.useForm();

  const { run } = useRequest(save, {
    manual: true,
    onSuccess: (x) => {
      message.success('Role is saved', x);
      form.resetFields();
    },
    onError: (e) => {
      console.log(e);
      message.error('Error happened ', e);
    },
  });

  const onFinish = async (values) => {
    console.log(values, form);
    //  run(values);
    const result = await save(values);
    console.log(result);

    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      form.resetFields();
    }
  };

  return (
    <PageContainer content="My amazing role entry form">
      <Card bordered={false}>    
           <div className={styles.salesCard}>
            <Tabs
             
            >
              <TabPane tab="General Profile" key="generalProfile">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                     <ProForm
                      hideRequiredMark
                      style={{
                        margin: 'auto',
                        marginTop: 8,
                        maxWidth: 600,
                      }}
                      name="basic"
                      layout="vertical"
                      onFinish={(v) => onFinish(v)}
                      form={form}
                    >
                      <ProFormText
                        width="md"
                        label="Name"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter role name',
                          },
                        ]}
                        placeholder="Please enter role name"
                      />

                      <ProFormText
                        width="md"
                        label="Alias"
                        name="alias"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the Alias',
                          },
                        ]}
                        placeholder="Please enter role alias"
                      />
                    </ProForm>

                  </Col>
                  {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>Store Sales Ranking</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span className={styles.rankingItemValue}>
                              {numeral(item.total).format('0,0')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col> */}
                </Row>
              </TabPane>
              <TabPane tab="Dimension" key="views">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Column
                        height={300}
                        forceFit
                        data={[]}
                        xField="x"
                        yField="y"
                        xAxis={{
                          visible: true,
                          title: {
                            visible: false,
                          },
                        }}
                        yAxis={{
                          visible: true,
                          title: {
                            visible: false,
                          },
                        }}
                        title={{
                          visible: true,
                          text: 'Visits Trend',
                          style: {
                            fontSize: 14,
                          },
                        }}
                        meta={{
                          y: {
                            alias: 'Visits',
                          },
                        }}
                      />
                    </div>
                  </Col>
               
                </Row>
              </TabPane>
              <TabPane tab="Invoicing & Payments" key="payments">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Column
                        height={300}
                        forceFit
                        data={[]}
                        xField="x"
                        yField="y"
                        xAxis={{
                          visible: true,
                          title: {
                            visible: false,
                          },
                        }}
                        yAxis={{
                          visible: true,
                          title: {
                            visible: false,
                          },
                        }}
                        title={{
                          visible: true,
                          text: 'Visits Trend',
                          style: {
                            fontSize: 14,
                          },
                        }}
                        meta={{
                          y: {
                            alias: 'Visits',
                          },
                        }}
                      />
                    </div>
                  </Col>
               
                </Row>
              </TabPane>
               <TabPane tab="Purchase" key="purchase">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Column
                        height={300}
                        forceFit
                        data={[]}
                        xField="x"
                        yField="y"
                        xAxis={{
                          visible: true,
                          title: {
                            visible: false,
                          },
                        }}
                        yAxis={{
                          visible: true,
                          title: {
                            visible: false,
                          },
                        }}
                        title={{
                          visible: true,
                          text: 'Visits Trend',
                          style: {
                            fontSize: 14,
                          },
                        }}
                        meta={{
                          y: {
                            alias: 'Visits',
                          },
                        }}
                      />
                    </div>
                  </Col>
               
                </Row>
              </TabPane>
            </Tabs>
          </div>
      </Card>
    
    </PageContainer>
  );
};

export default EntryForm;
