import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TextBox from '../components/atoms/TextBox';
import TextArea from '../components/atoms/TextArea';

const Form = styled.form`
  p {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
`

const FormTextBox = styled(TextBox)`
  order: 2;
`

const Fieldset = styled.fieldset`
  padding: 40px 0;
`

const FloatLabel = styled.label`
  display: block;
  transition-property: transform, color;
  transition-duration: var(--base-duration);
  transition-timing-function: var(--base-timing-function);
  transform: translateY(32px);
  transform-origin: 0 100%;

  textarea ~ & {
    padding-left: 8px;
  }

  p:focus-within & {
    color: var(--primary-color);
    transform: translateY(0) scale(0.8);
  }

  input:not(:placeholder-shown) ~ &,
  textarea:not(:placeholder-shown) ~ & {
    transform: translateY(0) scale(0.8);
  }
`

const FormTextArea = styled(TextArea)`
  order: 2;
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
        <p>
          <FormTextBox id="name" name="name" placeholder="お名前" />
          <FloatLabel htmlFor="name">お名前</FloatLabel>
        </p>
        <p>
          <FormTextBox id="email" type="email" name="email" placeholder="メールアドレス" />
          <FloatLabel htmlFor="email">メールアドレス</FloatLabel>
        </p>
        <p>
          <FormTextArea name="message" id="message" placeholder="お問い合わせ内容" />
          <FloatLabel htmlFor="message">お問い合わせ内容</FloatLabel>
        </p>
        <SubmitButton type="submit">送信</SubmitButton>
      </Fieldset>
    </Form>
  </Layout>
)

export default ContactPage
