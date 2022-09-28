import { LambdaIntegration, MethodLoggingLevel, RestApi } from "aws-cdk-lib/aws-apigateway"
import { Function, Runtime, AssetCode } from "aws-cdk-lib/aws-lambda"
import { Duration, Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"

type LambdaApiStackProps = StackProps

export class LambdaApiStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaApiStackProps) {
    super(scope, id, props)

    const restApi = this.createRestApi();
    this.createLambdas(restApi);
  }

  createRestApi() {
    return new RestApi(this, this.stackName + "RestApi", {
      deployOptions: {
        stageName: "prod",
        metricsEnabled: true,
        loggingLevel: MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "access-control-allow-credentials",
          "access-control-allow-origin",
          "access-control-expose-headers",
          "apigw-requestid",
          "content-length",
          "content-type",
          "date",
          "vary",
          "authorization"
        ],
        exposeHeaders: [
          'authorization',
          '*'
        ],
        allowMethods: ['OPTIONS', 'GET'],
        allowCredentials: true,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        allowOrigins: [process.env.FRONTEND_URI!, process.env.ALTERNATIVE_URI!],
        maxAge: Duration.minutes(10),
      }
    })
  }

  commonLambdaParameter() {
    return {
      runtime: Runtime.NODEJS_14_X,
      memorySize: 128,
      timeout: Duration.seconds(20),
      environment:{
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        "SECRET": process.env.SECRET!
      },
    };
  }

  createLambdas(restApi: RestApi) {
    [{
      functionName: "PublicKey",
      codePath: "public",
      methods: ["GET"],
    }, {
      functionName: "PrivateKey",
      codePath: "private",
      methods: ["GET"],
    }].forEach((lambda) => {
      const lambdaFunction = new Function(this, lambda.functionName, {
        functionName: lambda.functionName,
        handler: "index.handler",
        code: new AssetCode(`./dist/${lambda.codePath}`),
        ...this.commonLambdaParameter(),
      })

      const resource = restApi.root.addResource(lambda.functionName.toLowerCase());
      const dateResource = resource.addResource("{date}");

      lambda.methods.forEach((method: string) =>
        dateResource.addMethod(method, new LambdaIntegration(lambdaFunction, {})));
    });
  }
}
