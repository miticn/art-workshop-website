export function confirmPasswordValidator(formGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
}
//# sourceMappingURL=confirmPasswordValidator.js.map