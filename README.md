# SES-report-Store-S3 through lambda 
This is a lambda-function that generate reports of Bounce and Complaint and save on S3 Bucket in a web-format, like a dashboard that allows searchs (message-id, recipient email, etc) However, the logic to control the Bounce and Complaints notifications is ready to be customized.


SES Account up and running
SNS Notification for Bounces and Complaints || Notifications

SQS || Manage the Notification's queue

CloudWatch Events || Will trigger the Lambda function

Lambda NodeJS || Will generate the report and send the URL via Email(SES)

#How does it work

Amazon SES
Amazon SNS – Bounces and Complaints notifications

Amazon SQS – Queue for the Notifications

Lambda – Will Process the queue, create the Report, save to S3 and send the report URL via Email using SES

CloudWatch – Will trigger the lambda-function using “Scheduled Events"

#Configuration Steps 
Create an Amazon SNS topic [1].

Create an Amazon SQS Standard Queue [2]. Only changing: Default Visibility Timeout to 5m.

Subscribe the queue to SNS Topic previously created [3].

Create an Amazon S3 Bucket.

Create an IAM policy(Create your Own Policy) with the following permission (changing the  Queue ARN for yours and the BucketName) [4].

paste the Policy code  from policy file

Create an IAM Role and attach the policy just created (You will use this Role for lambda execution) [5].

Create an Amazon lambda-function following the steps below.
#Lambda Function
Sign in to the AWS Management Console and open the AWS Lambda console.

Choose Get Started Now.

Create a Lambda function go to the Lambda > Create function.

Choose Black Function

Select the Runtime Node.js 12.x

Select the IAM Role you have created previously.

Give a Name and description for your Lambda-Function

On “Code entry Type” chose “Upload a .ZIP file”, select the zip file You have downlaod from above.

On Environment variables, you need to add the following variables:

Region: eu-west-1 // Your Queue Region [REQUIRED]

QueueURL: https://sqs.eu-west-1.am… // The Queue URL [REQUIRED]

ToAddr: yourVerifiedEmail // Email address which will receive the report [Optional – If you don’t create it, no report will be sent via Email]

SrcAddr: youVerifiedEmail // Email address which will send the report [REQUIRED IF using ToAddr]

BucketName: yourBucketName  // Bucket to save the report [REQUIRED]

BucketPrefix: YourPrefix/ // Bucket prefix to save the report [Optional – If present, need to finish with slash “/”]

#Enabling the Bounces and Complaints Notifications for identities


Go to SES Console
create your Identity and verify it.
Edit the notification for the identity
Select the SNS topic created for Bounces and Complaints
Then go to SQS Console > Select the Queue > Purge Queue (This is a required step because SES sends a confirmation notification and it’s not needed).

#Triggering the Function with CloudWatch
Go to CloudWatch console
Click on Events > Rules > Create Rule
Select Schedule > Fixed rate > 1 Day
On Target, select the lambda-function > Configure
Give a name > Create Rule





