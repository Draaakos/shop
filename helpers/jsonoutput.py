def success(result = None):
    output = {'success': True}

    if result is not None:
        output['result'] = result

    return output

def error(reason):
    output = {'success': False, 'message': reason}
    return output
