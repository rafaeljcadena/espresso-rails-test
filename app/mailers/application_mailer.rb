# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'suporte@espressoapp.com.br'
  layout 'mailer'
end
