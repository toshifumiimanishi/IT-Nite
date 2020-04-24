import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'

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
    color: var(--prime-color);
    transform: translateY(0) scale(0.8);
  }

  input:not(:placeholder-shown) ~ &,
  textarea:not(:placeholder-shown) ~ & {
    transform: translateY(0) scale(0.8);
  }
`

const TextField = styled.input`
  order: 2;
  border: 0;
  border-bottom: 1px solid var(--base-border-color);
  padding: 8px;
  width: 100%;
  background-color: transparent;

  &::placeholder {
    color: transparent;
  }

  &:focus {
    border-color: var(--prime-border-color);
  }
`

const TextArea = styled.textarea`
  order: 2;
  border: 1px solid var(--base-border-color);
  border-radius: var(--base-border-radius);
  padding: 8px;
  width: 100%;
  background-color: transparent;

  ::placeholder {
    color: transparent;
  }
`

const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  background-color: var(--base-button-background-color);
  font-weight: bold;
`

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <Form name="contact" method="post" netlify-honeypot="bot-field" data-netlify="true">
      <Fieldset>
        <input type="hidden" name="bot-field" />
        <p>
          <TextField type="text" name="name" id="name" placeholder="お名前" />
          <FloatLabel htmlFor="name">お名前</FloatLabel>
        </p>
        <p>
          <TextField type="email" name="email" id="email" placeholder="メールアドレス" />
          <FloatLabel htmlFor="email">メールアドレス</FloatLabel>
        </p>
        <p>
          <TextArea name="message" rows="5" id="message" placeholder="お問い合わせ内容" />
          <FloatLabel htmlFor="message">お問い合わせ内容</FloatLabel>
        </p>
        <SubmitButton type="submit">送信</SubmitButton>
      </Fieldset>
    </Form>
  </Layout>
)

export default ContactPage
