import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TextBox from '../components/atoms/TextBox';
import TextArea from '../components/atoms/TextArea';
import FloatLabel from '../components/molecules/FloatLabel';

const Form = styled.form`
  p {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
`

const Fieldset = styled.fieldset`
  padding: 40px 0;
`

const SubmitButton = styled.button`
  border-radius: var(--base-border-radius);
  width: 120px;
  height: 40px;
  background-color: var(--base-button-background-color);
  font-weight: bold;
  transition: background-color var(--base-duration) var(--base-timing-function);

  @media screen and (min-width: 768px) {
    &:hover {
      background-color: var(--base-button-hover-background-color);
    }
  }
`

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <Form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
      <Fieldset>
        <input type="hidden" name="form-name" value="contact" />
        <FloatLabel labelName="お名前" htmlFor="name">
          <TextBox id="name" name="name" placeholder="お名前" />
        </FloatLabel>
        <FloatLabel labelName="メールアドレス" htmlFor="email">
          <TextBox id="email" type="email" name="email" placeholder="メールアドレス" />
        </FloatLabel>
        <FloatLabel labelName="お問い合わせ内容" htmlFor="message">
          <TextArea name="message" id="message" placeholder="お問い合わせ内容" />
        </FloatLabel>
        <SubmitButton type="submit">送信</SubmitButton>
      </Fieldset>
    </Form>
  </Layout>
)

export default ContactPage
