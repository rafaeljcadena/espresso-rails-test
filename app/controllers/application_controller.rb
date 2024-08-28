# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_forgery_protection
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[company_id role name])
  end
end
