import { ProDescriptions } from '@ant-design/pro-components';
import { Button, Popover } from 'antd';

import { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';

const Example: React.FC = () => {
  const sdkInfo = (
    <div>
      <ProDescriptions column={1} bordered={true}>
        <ProDescriptions.Item label={'SDK 包名称'} copyable>
          aba-api-client-sdk-spring
        </ProDescriptions.Item>
        <ProDescriptions.Item label={'SDK 版本'} copyable>
          0.0.1-SNAPSHOT
        </ProDescriptions.Item>
        <ProDescriptions.Item label={'SDK 包管理平台'} copyable>
          maven
        </ProDescriptions.Item>
        <ProDescriptions.Item label={'SDK 安装命令'} valueType={'code'} copyable>
          {`# 版本在maven生效需要时间，如获取不到对应的版本，可以调低版本号
<dependency>
    <groupId>cloud.zfwproject</groupId>
    <artifactId>aba-api-client-sdk-spring</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>`}
        </ProDescriptions.Item>
      </ProDescriptions>
    </div>
  );

  const title = (
    <Popover placement={'bottomLeft'} content={sdkInfo}>
      <Button type="link" icon={<InfoCircleOutlined />}>
        SDK 依赖信息
      </Button>
    </Popover>
  );

  return (
    <ProDescriptions title={title}>
      <ProDescriptions.Item valueType={'code'}>
        {`import com.tencentcloudapi.common.Credential;
import com.tencentcloudapi.common.profile.ClientProfile;
import com.tencentcloudapi.common.profile.HttpProfile;
import com.tencentcloudapi.common.exception.TencentCloudSDKException;
import com.tencentcloudapi.cvm.v20170312.CvmClient;
import com.tencentcloudapi.cvm.v20170312.models.*;

public class DescribeZones
{
    public static void main(String [] args) {
        try{
            // 实例化一个认证对象，入参需要传入腾讯云账户 SecretId 和 SecretKey，此处还需注意密钥对的保密
            // 代码泄露可能会导致 SecretId 和 SecretKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考，建议采用更安全的方式来使用密钥，请参见：https://cloud.tencent.com/document/product/1278/85305
            // 密钥可前往官网控制台 https://console.cloud.tencent.com/cam/capi 进行获取
            Credential cred = new Credential("SecretId", "SecretKey");
            // 实例化一个http选项，可选的，没有特殊需求可以跳过
            HttpProfile httpProfile = new HttpProfile();
            httpProfile.setEndpoint("cvm.tencentcloudapi.com");
            // 实例化一个client选项，可选的，没有特殊需求可以跳过
            ClientProfile clientProfile = new ClientProfile();
            clientProfile.setHttpProfile(httpProfile);
            // 实例化要请求产品的client对象,clientProfile是可选的
            CvmClient client = new CvmClient(cred, "", clientProfile);
            // 实例化一个请求对象,每个接口都会对应一个request对象
            DescribeZonesRequest req = new DescribeZonesRequest();

            // 返回的resp是一个DescribeZonesResponse的实例，与请求对象对应
            DescribeZonesResponse resp = client.DescribeZones(req);
            // 输出json格式的字符串回包
            System.out.println(DescribeZonesResponse.toJsonString(resp));
        } catch (TencentCloudSDKException e) {
            System.out.println(e.toString());
        }
    }
}`}
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};

export default Example;
