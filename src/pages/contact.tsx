import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import TextField from '../components/atoms/TextField'
import TextArea from '../components/atoms/TextArea'
import Button from '../components/atoms/Button'
import FloatLabel from '../components/molecules/FloatLabel'

const Form = styled.form`
  > .form_container {
    padding: 40px;

    @media screen and (max-width: 767.8px) {
      padding-right: 6.25%;
      padding-left: 6.25%;
    }
  }

  .form_floatlabel {
    + .form_floatlabel {
      margin-top: 20px;
    }
  }

  .form_textarea {
    margin-top: 10px;
  }
`

const SubmitButton = styled(Button)`
  margin-top: 32px;
  width: 120px;
  height: 40px;
`

const ContactPage: React.FC = () => (
  <Layout>
    <SEO title="Contact" />
    <Form
      name="contact"
      method="post"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <div className="form_container">
        <fieldset>
          <input type="hidden" name="form-name" value="contact" />
          <FloatLabel
            className="form_floatlabel"
            labelName="お名前"
            htmlFor="name"
          >
            <TextField id="name" name="name" placeholder="お名前" />
          </FloatLabel>
          <FloatLabel
            className="form_floatlabel"
            labelName="メールアドレス"
            htmlFor="email"
            errorMessage="有効なメールアドレスを入力してください。"
          >
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="メールアドレス"
            />
          </FloatLabel>
          <FloatLabel
            className="form_floatlabel"
            labelName="お問い合わせ内容"
            htmlFor="message"
          >
            <TextArea
              name="message"
              id="message"
              placeholder="お問い合わせ内容"
            />
          </FloatLabel>
          <SubmitButton type="submit">送信</SubmitButton>
        </fieldset>
      </div>
    </Form>
  </Layout>
)

export default ContactPage
