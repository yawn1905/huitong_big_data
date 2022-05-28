import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
function BasicForm() {
  return (
    <div id={styles.BasicForm}>
      <PageContainer content="欢迎使用基础表单，基础表单是基于 Ant Design Pro 的一套基础表单组件库。">
        <ProCard ghost gutter={24}>
          123
        </ProCard>
      </PageContainer>
    </div>
  );
}

export default BasicForm;
