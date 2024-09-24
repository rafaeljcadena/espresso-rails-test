# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  describe 'instructions' do
    let(:employee) { create(:employee_a_first) }
    let(:mail) { UserMailer.welcome(employee.id).deliver_now }

    it 'renders the subject' do
      expect(mail.subject).to eq('Bem-vindo ao Espresso! Aqui estão suas credenciais de acesso')
    end

    it 'renders the receiver email' do
      expect(mail.to).to eq([employee.email])
    end

    it 'renders the sender email' do
      expect(mail.from).to eq(['suporte@espressoapp.com.br'])
    end

    it 'must have @name' do
      expect(mail.body.encoded).to match(employee.name)
    end

    it 'must have sign_up url' do
      url = "#{root_url}app/sign-up"

      expect(mail.body.encoded).to match(url)
    end
  end
end
