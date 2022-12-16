{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "sqs:DeleteMessage",
                "s3:PutObject",
                "logs:CreateLogStream",
                "sqs:GetQueueUrl",
                "sqs:ChangeMessageVisibility",
                "logs:DescribeLogStreams",
                "sqs:ReceiveMessage",
                "sqs:GetQueueAttributes",
                "logs:CreateLogGroup",
                "logs:PutLogEvents",
                "s3:PutObjectAcl"
            ],
            "Resource": [
                "arn:aws:logs:*:*:*",
                "arn:aws:s3:::BucketName/*",
                "arn:aws:sqs:YourSQSQueueARN"
            ]
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "ses:SendEmail",
            "Resource": "*"
        }
    ]
}
