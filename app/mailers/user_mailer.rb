# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def welcome(user_id)
    @user = User.find(user_id)

    mail to: @user.email, subject: I18n.t('mailers.welcome.subject')
  end
end
